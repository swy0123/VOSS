import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { OpenVidu } from "openvidu-browser";
import { MeetRoomData, MeetingProps, getMeet, joinMeet } from "../../api/meeting";
import { MeetingBoardProps } from "../../pages/MeetingBoard/MeetingBoard";
import {
  Category,
  Count,
  CountImg,
  CountSection,
  ListBox,
  LockImg,
  MeetingListDiv,
  MeetingRoom,
  OnAirImg,
  PageMoveBtnImg,
  PaginationWrapper,
  PagingDiv,
  Title,
} from "./MeetingList.style";
import GoLeft from "../../assets/Meeting/GoLeft.png";
import GoRight from "../../assets/Meeting/GoRight.png";
import AlertContext from "/src/context/alert/AlertContext";
import PromptContext from "/src/context/prompt/PromptContext";
import ConfirmContext from "/src/context/confirm/ConfirmContext";

function MeetingList({ meetingBoardProps }: { meetingBoardProps: MeetingBoardProps }) {
  //이거도 전역 변수 만들어서 처리하면 좋을 듯?/
  const Tag = ["DUB", "PRACTICE", "FREE"];
  const navigate = useNavigate();

  const [meetingData, setData] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);

  const { alert: alertComp } = useContext(AlertContext);
  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  const { prompt: promptComp } = useContext(PromptContext);
  const onPromptClick = async (text:string) => {
    const result = await promptComp(text);
      console.log("custom", result);
      return result;
  };

  const { confirm: confirmComp } = useContext(ConfirmContext);
  const onConfirmClick = async (text:string)  => {
    const result = await confirmComp(text);
      console.log("custom", result);
      return result;
  };

  const TagName = {
    PRACTICE: "목소리 분석 연습",
    DUB: "더빙 연습",
    FREE: "기타",
  };

  const maxDisplayedPages = 10;
  const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);

  useEffect(() => {
    //todo : meetingBoardProps받은거로 수정
    console.log("MeetingList - meetingBoardProps");
    console.log(meetingBoardProps);
    SetNewList();
  }, [meetingBoardProps]);

  useEffect(() => {
    setTotalPages(Math.floor(meetingData.length / 10 + 1));
    setPages([...Array(totalPages).keys()].map((page) => page + 1));
    if (totalPages <= maxDisplayedPages) {
      setStartPage(1);
      setEndPage(totalPages);
    } else {
      if (currentPage <= halfDisplayedPages) {
        setStartPage(1);
        setEndPage(maxDisplayedPages);
      } else if (currentPage >= totalPages - halfDisplayedPages) {
        setStartPage(totalPages - maxDisplayedPages + 1);
        setEndPage(totalPages);
      }
    }
    setRoomsData();
  }, [meetingData, currentPage]);

  const SetNewList = async () => {
    const tmp = {
      title: meetingBoardProps.title,
      category: meetingBoardProps.category,
    };
    const tttmp = await getMeet(tmp);
    const newList = [...tttmp];

    setData([...newList]);
  };

  // const clickPageChange = (page: number) => {
  //   SetNewList();
  //   setCurrentPage(page);
  // };

  const setRoomsData = () => {
    setRooms(meetingData.slice((currentPage - 1) * 10, currentPage * 10));
  };

  const goPostDetail = async (data: MeetRoomData) => {
    let password : string | null = "";
    try {
      if (data.password) {
        password = await onPromptClick("비밀번호를 입력해주세요" + "");
        if(password == null) return;
        const roomData = await getToken(password, data.meetRoomId);
        navigate(`/meeting/join`, {
          state: { password: password, meetRoomId: data.meetRoomId, roomData: roomData, category: data.category },
        });
      } else if (await onConfirmClick(data.meetRoomId + "방에 입장하시겠습니까?")) {
        const roomData = await getToken(password, data.meetRoomId);
        navigate(`/meeting/join`, {
          state: { password: password, meetRoomId: data.meetRoomId, roomData: roomData, category: data.category },
        });
      }
    } catch {
      console.log("joinMeetingRoom error");
    }
  };

  const getToken = async (password: string, meetRoomId: number) => {
    const props: MeetingProps = {
      password: password,
      meetRoomId: meetRoomId,
    };
    const res = await joinMeet(props);
    if (res.message !== undefined) onAlertClick(res.message);
    // else alert(res);
    console.log(res);
    return res;
  };

  return (
    <MeetingListDiv>
      <ListBox>
        {rooms.map((data, index) => (
          <MeetingRoom key={index} $IsOnAir={data.scriptId!==0} onClick={() => goPostDetail(data)}>
            <Category>{data.category}</Category>
            <Title>{data.title}</Title>
            <CountSection>
              {data.scriptId !== 0 ? <OnAirImg src="/src/assets/MeetingBoard/OnAir.png"></OnAirImg> : <></>}
              {data.password ? <LockImg src="/src/assets/MeetingBoard/Lock.png"></LockImg> : <></>}
              <Count>
                {data.currentCount}/{data.maxCount}
              </Count>
              <CountImg src="/src/assets/MeetingBoard/Usercount.png"></CountImg>
            </CountSection>
            <br></br>
          </MeetingRoom>
        ))}
      </ListBox>
      <PagingDiv>
        <PaginationWrapper>
          <PageMoveBtnImg
            src={GoLeft}
            onClick={() => {
              currentPage > 1 && setCurrentPage(currentPage - 1);
            }}
          />
          {currentPage}/{totalPages}
          <PageMoveBtnImg
            src={GoRight}
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          />
        </PaginationWrapper>
      </PagingDiv>
    </MeetingListDiv>
  );
}

export default MeetingList;
