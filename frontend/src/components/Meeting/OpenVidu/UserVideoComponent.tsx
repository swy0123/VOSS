import BadgeModal from "./BadgeModal";
import OpenViduVideoComponent from "./OvVideo";
// import './UserVideo.css';
import {
  ProfileImg,
  VedioHoverMenu,
  VedioInnerDiv,
  VedioMuteIcon,
  VedioOuterDiv,
} from "./UserVideoComponent.style";
import React, { useCallback, MouseEvent, useState, useEffect, useRef, useContext } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { selectedMember } from "/src/recoil/Meeting";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { getMember } from "/src/api/meeting";
import { postFollow } from "/src/api/profile";
import AlertContext from "/src/context/alert/AlertContext";
import Mute from "../../../assets/Meeting/MicOff.png";

const UserVideoComponent = (props: any) => {
  const [selected, setSelected] = useRecoilState(selectedMember);
  const currentUser = useRecoilValue(CurrentUserAtom);
  const [isOver, setOver] = useState<boolean>(false);
  const [isMuted, toggleMuted] = useState<boolean>(false);
  const [userNickname, setUserNickname] = useState(currentUser.nickname);
  const [userEmail, setUserEmail] = useState("");
  const [userImgURL, setuserImgURL] = useState<string>("");
  const [userId, setUserId] = useState(0);

  const anchorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.streamManager !== undefined) {
      const data = props.streamManager.stream.connection.data;
      const validJsonData = data.split("%/%")[0];
      setUserData(JSON.parse(validJsonData).clientData);
    } else {
      console.log(props.streamManager.stream.data);
    }
  }, []);

  // useEffect(() => {
  //   console.log(anchorRef.current?.offsetWidth || 0) 
  // }, [anchorRef.current?.offsetWidth]);

  const setUserData = async (email: string) => {
    setOver(false);
    const response = await getMember(email);

    setUserEmail(email);
    setUserNickname(response.data.nickname);
    setUserId(response.data.id);
    setuserImgURL("https://b106-voss.s3.ap-northeast-2.amazonaws.com/" + response.data.imageUrl);
    setSelected({
      userId: userId,
      email: userEmail,
      nickname: userNickname,
      userImgURL: userImgURL,
    });
  };

  const { alert: alertComp } = useContext(AlertContext);
  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  const handleMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (!props.isOpenModal) setOver(true);
  };
  const handleMouseOut = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (!props.isOpenModal) setOver(false);
  };

  const onClickMute = useCallback(() => {
    toggleMuted(!isMuted);
  }, [isMuted]);

  const onClickFollow = async () => {
    const response = await postFollow(userId);
    if (response.isFollowSuccess) onAlertClick("팔로우 성공");
    else onAlertClick("이미 팔로우한 사용자입니다.");
  };

  const onClickGiveBadge = () => {
    setUserData(userEmail);
    props.onClickToggleModal();
  };

  return (
    <VedioOuterDiv
      className="streamcomponent"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      ref={anchorRef}
      style={{ fontSize: anchorRef.current?.offsetWidth }}
    >
      {!props.streamManager.stream.videoActive ? (
        <ProfileImg id="111">
          <img src={userImgURL} alt="이미지가 들어갈 자리입니다" />
        </ProfileImg>
      ) : (
        <></>
      )}
      {props.streamManager !== undefined ? (
        <>
          {isOver && props.isOpenModal !== undefined && !props.isOpenModal ? (
            <div style={{ fontSize: anchorRef.current?.offsetWidth }}>
              <VedioHoverMenu style={{ top: "25%" }} onClick={onClickGiveBadge}>
                {" "}
                뱃지주기
              </VedioHoverMenu>
              <VedioHoverMenu style={{ top: "50%" }} onClick={onClickFollow}>
                {" "}
                + 팔로우
              </VedioHoverMenu>
              <VedioHoverMenu style={{ top: "75%" }} onClick={onClickMute}>
                {" "}
                {!isMuted ? "음소거" : "음소거 해제"}
              </VedioHoverMenu>
            </div>
          ) : (
            <></>
          )}

          <VedioInnerDiv>{userNickname} </VedioInnerDiv>

          {isMuted || !props.streamManager.stream.audioActive ? <VedioMuteIcon src={Mute} /> : <></>}

          <OpenViduVideoComponent streamManager={props.streamManager} isMuted={isMuted} />
        </>
      ) : null}
    </VedioOuterDiv>
  );
};

export default UserVideoComponent;
