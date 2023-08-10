import React, { PropsWithChildren, useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import ProfileImg from "../../../assets/Messenger/profile.png";
import SendArrow from "../../../assets/Messenger/SendArrow.png";
import { GiveBadgeProps, postBadge } from "../../../api/meeting";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedMember } from "/src/recoil/Meeting";
import { BadgeContentDesign } from "../BadgeBox/BadgeBox.style";
import { getBadgeList } from "/src/api/meeting";
import {
  Backdrop,
  DialogBox,
  ExitImg,
  MeetBadgeDiv,
  MeetBadgeHovor,
  MeetBadgeImg,
  ModalContainer,
  ModalHeader,
} from "./MeetJoin.style";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

interface BadgeData {
  id: number;
  name: string;
}

const BadgeModal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
  const [selected, setSelected] = useRecoilState(selectedMember);
  const [exitBtnHover, setExitBtnHover] = useState(false);
  const [hover, setHover] = useState<number>(0);
  const [badgeList, setBadgeList] = useState<BadgeData[]>();
  const navigate = useNavigate();
  //서버와 통신해서 해당 사용자의 친구목록 전부 표시 (이후 전역에 저장해 관리)
  //FriendsList
  useEffect(() => {
    console.log(selected);
    getBadge();
  }, []);

  const getBadge = async () => {
    const response = await getBadgeList();
    setBadgeList([...response]);
  };
  const giveBadge = async (id: number) => {
    const giveBadgeProps: GiveBadgeProps = {
      receiverId: selected.userId,
      badgeId: id,
    };
    const response = await postBadge(giveBadgeProps);
    console.log(response);
    if (response.success == true) alert("뱃지 부여 성공!");
    else alert("뱃지 부여 실패! 같은 사람이 24시간 안에 같은 사람에게 같은 배지 못 줌!");
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  return (
    <ModalContainer>
      <DialogBox>
        <ModalHeader>
          <h1>배지 주기</h1>
          <h3>마우스를 올리면 배지의 설명이 나타납니다.</h3>
        </ModalHeader>
        <div
          style={{
            width: "100%",
            height: "100%",
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible",
            flexWrap: "wrap",
          }}
        >
          {badgeList !== undefined ? (
            badgeList.map((badge, id) => (
              <MeetBadgeDiv key={id}>
                <MeetBadgeImg
                  onMouseEnter={() => setHover(badge.id)}
                  onMouseLeave={() => setHover(0)}
                  src={`/src/assets/Profile/badge/B${badge.id + 1}.png`}
                  alt=""
                  onClick={() => {
                    giveBadge(badge.id + 1);
                  }}
                />
                {hover !== 0 && hover === badge.id ? (
                  <MeetBadgeHovor $hoverActive={hover} >
                    <div className="hover-text"> {badge.name}</div>
                  </MeetBadgeHovor>
                ) : (
                  <></>
                )}
              </MeetBadgeDiv>
            ))
          ) : (
            <></>
          )}
        </div>

        <ExitImg
          src={exitBtnHover ? ExitBoxHover : ExitBox}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (onClickToggleModal) {
              onClickToggleModal();
            }
          }}
          onMouseEnter={() => setExitBtnHover(true)}
          onMouseLeave={() => setExitBtnHover(false)}
        />
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
};
export default BadgeModal;
