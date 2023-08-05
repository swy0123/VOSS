import React, { useState } from "react";
// import './ToolbarComponent.css';

import logo from "../../../assets/main/MainLogo.png";
import MikeOn from "../../../assets/Meeting/MikeOn.png";
import MikeOff from "../../../assets/Meeting/MikeOff.png";

import { IconButton, Toolbar } from "@mui/material";
import {
  Videocam,
  VideocamOff,
  PowerSettingsNew,
} from "@mui/icons-material";
import { AppBar } from "./ToolbarComponent.style";
import { MikeIcon } from "/src/pages/Meeting/Meeting.style";

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
    <AppBar className="toolbar" id="header">
      <Toolbar className="toolbar">
        <div className="buttonsContent">
          <IconButton
            color="inherit"
            className="navButton"
            id="navMicButton"
            onClick={micStatusChanged}
          >
            {props.audioActive ? <MikeIcon src={MikeOff} color="secondary" /> : <MikeIcon src={MikeOn} />}
          </IconButton>
          <IconButton
            color="inherit"
            className="navButton"
            id="navCamButton"
            onClick={camStatusChanged}
          >
            {props.videoActive ? <VideocamOff color="secondary" /> : <Videocam />}
          </IconButton>
          <IconButton
            color="secondary"
            className="navButton"
            onClick={leaveSession}
            id="navLeaveButton"
          >
            <PowerSettingsNew />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
