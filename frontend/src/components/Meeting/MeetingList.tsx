import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { OpenVidu } from "openvidu-browser";
import { MeetRoomData, getMeet } from "../../api/meeting";
import { MeetingBoardProps } from "../../pages/MeetingBoard/MeetingBoard";
import {
  Category,
  Count,
  CountImg,
  CountSection,
  ListBox,
  MeetingListDiv,
  MeetingRoom,
  PageMoveBtnImg,
  PaginationWrapper,
  PagingDiv,
  Title,
} from "./MeetingList.style";
import GoLeft from "../../assets/Meeting/GoLeft.png";
import GoRight from "../../assets/Meeting/GoRight.png";

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

  const TagName = {
    "DUB": "목소리 분석 연습",
    "PRACTICE": "더빙 연습",
    "FREE": "기타",
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

  const clickPageChange = (page: number) => {
    SetNewList();
    setCurrentPage(page);
  };

  const setRoomsData = () => {
    setRooms(meetingData.slice((currentPage - 1) * 10, currentPage * 10));
  };

  const goPostDetail = (data: MeetRoomData) => {
    let password: string | null = "";
    if (data.password) {
      password = prompt("비밀번호를 입력해주세요" + "");
    }
    if (confirm(data.meetRoomId + "방에 입장하시겠습니까?")) {
      navigate(`/meeting/join`, { state: { password: password, meetRoomId: data.meetRoomId } });
    }
  };

  return (
    <MeetingListDiv>
      <ListBox>
        {rooms.map((data, index) => (
          <MeetingRoom key={index} onClick={() => goPostDetail(data)}>
            <Category>{data.category}</Category>
            <Title>{data.title}</Title>
            <CountSection>
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
          {/* {pages !== undefined && pages.slice(startPage - 1, endPage).map((page) => (
            <PaginationItem key={page} className={page === currentPage ? "active" : ""} onClick={() => clickPageChange(page)}>
              {page}
            </PaginationItem>
          ))} */}
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
