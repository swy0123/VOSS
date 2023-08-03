import React, { useState } from "react";
// import './ToolbarComponent.css';

import logo from "../../../assets/main/MainLogo.png";
import { AppBar, IconButton, Toolbar, Tooltip } from "@mui/material";
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  PowerSettingsNew,
  QuestionAnswer,
} from "@mui/icons-material";

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
        <div id="navSessionInfo">
          {props.sessionId && (
            <div id="titleContent">
              <span id="session-title">{mySessionId}</span>
            </div>
          )}
        </div>
        <div className="buttonsContent">
          <IconButton
            color="inherit"
            className="navButton"
            id="navMicButton"
            onClick={micStatusChanged}
          >
            {props.audioActive ? <MicOff color="secondary" /> : <Mic />}
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
          <IconButton color="inherit" onClick={toggleChat} id="navChatButton">
            {props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <QuestionAnswer />
            </Tooltip>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
