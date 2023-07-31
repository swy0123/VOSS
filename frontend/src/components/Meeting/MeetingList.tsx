import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { ListBox, MeetingRoom } from "./MeetingList.style";
import { OpenVidu } from "openvidu-browser";
import { getMeet } from "../../api/meeting";
import { MeetingBoardProps } from "../../pages/MeetingBoard";

// 로컬 미디어 서버 주소
const OPENVIDU_SERVER_URL = "https://i9b106.p.ssafy.io:5173";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

function MeetingList({ meetingBoardProps }: { meetingBoardProps: MeetingBoardProps }) {
  //이거도 전역 변수 만들어서 처리하면 좋을 듯?/
  const Tag = ["DUB", "PRACTICE", "FREE"];
  const navigate = useNavigate();

  const [meetingData, setDate] = useState<any[]>([]);

  useEffect(() => {
    //todo : meetingBoardProps받은거로 수정
    console.log("MeetingList - meetingBoardProps");
    console.log(meetingBoardProps);
    SetNewList();
  }, [meetingBoardProps]);

  const SetNewList = async () => {
    const tmp = {
      title: meetingBoardProps.title,
      category: "",
      page: "0",
      limit: "10",
    };
    const tttmp = await getMeet(tmp);
    console.log("SetNewList");
    console.log(tttmp);
    const newList = [...tttmp];

    setDate([...newList]);
  };

  const goPostDetail = (meetRoomId: number, password: string) => {
    if (confirm(meetRoomId+"방에 입장하시겠습니까?")) {
      console.log("meetRoomId : " + meetRoomId + ", password : " + password);
      navigate(`/meeting/join`, { state: { meetRoomId: meetRoomId, password: password } });
    }
  };

  return (
    <ListBox>
      {meetingData.map((data, index) => (
        //비번 없다고 가정하고 테스트
        <MeetingRoom key={index} onClick={() => goPostDetail(data.meetRoomId, data.password)}>
          {data.meetRoomId}
          {data.category}
          {data.title}
          <br></br>
          {data.currentCount}/{data.maxCount}
        </MeetingRoom>
      ))}
      <div>
        {/* 테스트 */}
        {/* {listProps.tags.map((data, index) => (
          <div key={index}>
            {index}{data}
            {data ? Tag[index] : ""}
          </div>
        ))}
        {listProps.words} */}
      </div>
    </ListBox>
  );
}

export default MeetingList;
