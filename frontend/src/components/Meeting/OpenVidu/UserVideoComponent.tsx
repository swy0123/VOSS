import OpenViduVideoComponent from "./OvVideo";
// import './UserVideo.css';
import { VedioHoverMenu, VedioInnerDiv, VedioOuterDiv } from "./UserVideoComponent.style";
import React, { ChangeEvent, MouseEvent, useState, useEffect, useRef } from "react";


const UserVideoComponent = (props: any) => {
  const [isOver, setOver] = useState<boolean>(false);

  const handleMouseOver = (event:MouseEvent<HTMLDivElement>)=>{
    console.log("handleMouseOver over")
    setOver(true);
  }
  const handleMouseOut = (event:MouseEvent<HTMLDivElement>)=>{
    console.log("handleMouseOut out")
    setOver(false);
  }

  const onClickMute = ()=>{
    console.log("대상 음소거")
    alert("대상 음소거")
  }

  const onClickFollow = ()=>{
    console.log("팔로우 하기")
    alert("팔로우 하기")
  }

  const onClickGiveBadge = ()=>{
    console.log("뱃지 주기")
    alert("뱃지 주기")
  }

  

  return (
    <VedioOuterDiv className="streamcomponent" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {props.streamManager !== undefined ? (
        <>
          {isOver ? <>
            <VedioHoverMenu style={{top:"25%"}} onClick={onClickGiveBadge}> 뱃지주기</VedioHoverMenu>
            <VedioHoverMenu style={{top:"50%"}} onClick={onClickFollow}> + 팔로우</VedioHoverMenu>
            <VedioHoverMenu style={{top:"75%"}} onClick={onClickMute}> 음소거</VedioHoverMenu>
            </> : <></>}


          {props.streamManager.connection !== undefined ? (
            <VedioInnerDiv>{props.streamManager.connection.data.clientData}</VedioInnerDiv>
          ) : (
            <></>
          )}

          <OpenViduVideoComponent streamManager={props.streamManager} />
        </>
      ) : null}
    </VedioOuterDiv>
  );
};

export default UserVideoComponent;
