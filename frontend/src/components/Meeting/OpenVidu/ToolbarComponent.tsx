import React, { useState } from "react";
// import './ToolbarComponent.css';

import MikeOn from "../../../assets/Meeting/MikeOn.png";
import MikeOff from "../../../assets/Meeting/MikeOff.png";
import VideoOff from "../../../assets/Meeting/VideoOff.png";
import VideoOn from "../../../assets/Meeting/VideoOn.png";
import Shutdown from "../../../assets/Meeting/Shutdown.png";
import ChatImg from "../../../assets/Meeting/ChatImg.png";

import { AppBar, ToolBarIcon, ToolBarIconDiv, ToolBarSetDiv, Toolbar } from "./ToolbarComponent.style";

const ToolbarComponent = (props: any) => {
  //   const [fullscreen, setFullscreen] = useState(false);

  const micStatusChanged = () => {
    props.micStatusChanged();
  };

  const camStatusChanged = () => {
    props.camStatusChanged();
  };

  // const screenShare = () => {
  //     props.screenShare();
  // };

  // const stopScreenShare = () => {
  //     props.stopScreenShare();
  // };

  const chatStatusChanged = () => {
    props.toggleChat()
  };

  // const switchCamera = () => {
  //     props.switchCamera();
  // };

  const leaveSession = () => {
    props.leaveSession();
  };

  const mySessionId = props.sessionId;

  return (
    <AppBar>
      <Toolbar>
        <ToolBarSetDiv>
          <ToolBarIconDiv onClick={micStatusChanged}>
            {props.audioActive ? (
              <ToolBarIcon src={MikeOff} />
            ) : (
              <ToolBarIcon src={MikeOn} />
            )}
          </ToolBarIconDiv>
          <ToolBarIconDiv onClick={camStatusChanged}>
            {props.videoActive ? <ToolBarIcon src={VideoOff} /> : <ToolBarIcon src={VideoOn} />}
          </ToolBarIconDiv>
          <ToolBarIconDiv onClick={chatStatusChanged}>
            <ToolBarIcon src={ChatImg} />
          </ToolBarIconDiv>
          <ToolBarIconDiv
            onClick={leaveSession}
          >
            <ToolBarIcon src={Shutdown} />
          </ToolBarIconDiv>
        </ToolBarSetDiv>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
