import { BackGroundImg } from "../../components/BackGroundImg";
import { styled } from "styled-components";
import Messenger from "../../components/Message/Messenger";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, H1, LeftSection, RightSection } from "./Meeting.style";
import MeetJoin from "../../components/Meeting/OpenVidu/MeetJoin";
import { MeetingProps } from "../../api/meeting";



function Meeting() {
  const { state } = useLocation(); // 2번 라인

  const props: MeetingProps = {
    password: state.password,
    meetRoomId: state.meetRoomId
  }

  return (
    <BackGroundImg>
      <MeetJoin props={props} />
      <Messenger />
    </BackGroundImg>
  );
}
export default Meeting;
