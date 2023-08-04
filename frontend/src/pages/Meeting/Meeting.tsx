import { BackGroundImg } from "../../components/BackGroundImg";
import { styled } from "styled-components";
import Messenger from "../../components/Message/Messenger";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { BottomSection, Container } from "./Meeting.style";
import MeetJoin from "../../components/Meeting/OpenVidu/MeetJoin";
import { MeetingProps } from "../../api/meeting";



function Meeting() {
  const { state } = useLocation(); // 2번 라인
  const [bottomOn, setBottomOn] = useState(false);

  const isBottomOn = () =>{
    setBottomOn(!bottomOn);
  }

  const props: MeetingProps = {
    password: state.password,
    meetRoomId: state.meetRoomId
  }

  return (
    <BackGroundImg>
      <Container $isClicked={bottomOn}>
      <MeetJoin props={props} />
      </Container>
      <BottomSection $isClicked={bottomOn} onClick={isBottomOn}>
sssssssss
      </BottomSection>
      <Messenger />
    </BackGroundImg>
  );
}
export default Meeting;
