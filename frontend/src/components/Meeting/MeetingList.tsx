import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { OpenVidu } from "openvidu-browser";
import { MeetRoomData, getMeet } from "../../api/meeting";
import { MeetingBoardProps } from "../../pages/MeetingBoard";
import { 
  Category, 
  Count, 
  CountImg, 
  CountSection, 
  ListBox, 
  MeetingRoom, 
  Title } from "./MeetingList.style";

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

  const goPostDetail = (data:MeetRoomData) => {
    let password:(string|null) = "";
    if(data.password){
      password = prompt("비밀번호를 입력해주세요"+"");
    }
    if (confirm(data.meetRoomId+"방에 입장하시겠습니까?")) {
      alert("meetRoomId : " + data.meetRoomId + ", password : " + password);
      navigate(`/meeting/join`, { state: { password: password, meetRoomId: data.meetRoomId } });
    }
  };

  return (
    <ListBox>
      {meetingData.map((data, index) => (
        //비번 없다고 가정하고 테스트
        <MeetingRoom key={index} onClick={() => goPostDetail(data)}>
          <Category>{data.category}</Category>
          <Title>{data.title}</Title>
          <CountSection>
            <Count>{data.currentCount}/{data.maxCount}</Count>
            <CountImg src="/src/assets/MeetingBoard/Usercount.png"></CountImg>
          </CountSection>
          <br></br>
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
