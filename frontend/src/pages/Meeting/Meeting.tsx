import { BackGroundImg } from "../../components/BackGroundImg";
import { styled } from "styled-components";
import Messenger from "../../components/Message/Messenger";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { BottomBarImg, BottomSection, CloseSectionBtn, ClosedBottomSection, Container } from "./Meeting.style";
import MeetJoin from "../../components/Meeting/OpenVidu/MeetJoin";
import { MeetingProps } from "../../api/meeting";
import BottomBar from "../../assets/Meeting/BottomBar.png";
import CloseSection from "../../assets/Meeting/CloseSection.png";
import DubbingRoom from "/src/components/Meeting/MeetDub/DubbingRoom/DubbingRoom";

//리코일 사용
import { useRecoilState } from "recoil";
import { sendMsg, recieveMsg } from "/src/recoil/MeetDub";
import { meetDubSelectState } from "/src/recoil/HW_Atom";
import DubbingList from "/src/components/Meeting/MeetDub/DubbingList/DubbingList";
/*
리코일 기본 값 = "none"
버튼 클릭 시 send 변경 후 chat에서 등록
각 값은 보내고 받을 때마다 none으로 초기화
*/


function Meeting() {
  const { state } = useLocation(); // 2번 라인
  const [bottomOn, setBottomOn] = useState(false);

  //send는 컴포넌트에서 보내는 이벤트
  //recieve는 chat으로 받는 이벤트
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);
  const [meetDubSelect, setMeetDubSelect] = useRecoilState<number>(meetDubSelectState)

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", onbeforeunload);
    })();

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  //이벤트 수신 감지
  useEffect(()=>{
    if(recieve=="open") {
      console.log("bottomOn");
      setBottomOn(!bottomOn);
      setRecieve("none");
    }
  }, [recieve])

  const onbeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  const isBottomOn = () => {
    setSend("open");
    console.log("isBottomOn")
  };
  
  const props: MeetingProps = {
    password: state.password,
    meetRoomId: state.meetRoomId,
    bottomOn: bottomOn,
  };

  return (
    <BackGroundImg>
      <Container $isClicked={bottomOn}>
        <MeetJoin props={props} />
      </Container>
      {bottomOn ? (
        <BottomSection>
          <CloseSectionBtn src={CloseSection} onClick={isBottomOn}/>
          {meetDubSelect ?  <DubbingRoom/> : <DubbingList/>}
        </BottomSection>
      ) : (
        <ClosedBottomSection>
          <BottomBarImg src={BottomBar} onClick={isBottomOn} />
        </ClosedBottomSection>
      )}

      <Messenger />
    </BackGroundImg>
  );
}
export default Meeting;
