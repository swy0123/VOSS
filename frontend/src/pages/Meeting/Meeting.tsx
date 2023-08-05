import { BackGroundImg } from "../../components/BackGroundImg";
import { styled } from "styled-components";
import Messenger from "../../components/Message/Messenger";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { BottomBarImg, BottomSection, ClosedBottomSection, Container } from "./Meeting.style";
import MeetJoin from "../../components/Meeting/OpenVidu/MeetJoin";
import { MeetingProps } from "../../api/meeting";
import BottomBar from "../../assets/Meeting/BottomBar.png";

function Meeting() {
  const { state } = useLocation(); // 2번 라인
  const [bottomOn, setBottomOn] = useState(false);
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", onbeforeunload);
    })();

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  const isBottomOn = () => {
    setBottomOn(!bottomOn);
  };

  const props: MeetingProps = {
    password: state.password,
    meetRoomId: state.meetRoomId,
  };

  return (
    <BackGroundImg>
      <Container $isClicked={bottomOn}>
        <MeetJoin props={props} />
      </Container>
      {bottomOn ? (
        <BottomSection onClick={isBottomOn}>sssssssss</BottomSection>
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
