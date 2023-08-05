import React, { useState } from "react";
// import './ToolbarComponent.css';

import MikeOn from "../../../assets/Meeting/MikeOn.png";
import MikeOff from "../../../assets/Meeting/MikeOff.png";
import VideoOff from "../../../assets/Meeting/VideoOff.png";
import VideoOn from "../../../assets/Meeting/VideoOn.png";
import Shutdown from "../../../assets/Meeting/Shutdown.png";

import { AppBar, ToolBarIcon, ToolBarIconDiv, ToolBarSetDiv, Toolbar } from "./ToolbarComponent.style";

const ToolbarComponent = (props: any) => {
  //   const [fullscreen, setFullscreen] = useState(false);

  const micStatusChanged = () => {
    console.log(props.audioActive);
    props.micStatusChanged();
    console.log(props.audioActive);
  };

  const camStatusChanged = () => {
    console.log(props.videoActive);
    props.camStatusChanged();
    console.log(props.videoActive);
  };

  // const screenShare = () => {
  //     props.screenShare();
  // };

  // const stopScreenShare = () => {
  //     props.stopScreenShare();
  // };

  // const toggleFullscreen = () => {
  //     setFullscreen(!fullscreen);
  //     props.toggleFullscreen();
  // };

  // const switchCamera = () => {
  //     props.switchCamera();
  // };

  const leaveSession = () => {
    props.leaveSession();
  };

  const toggleChat = () => {
    props.toggleChat();
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
