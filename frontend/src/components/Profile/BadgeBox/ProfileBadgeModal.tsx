import React, { PropsWithChildren, useState, MouseEvent, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BadgeModalShowState, BadgesState, ProfileState } from "/src/recoil/Auth";
import { selectedMember } from "/src/recoil/Meeting";
import {
  ModalContainer,
  DialogBox,
  Backdrop,
  ModalHeader,
  BadgeContent,
  MeetBadgeDiv,
  MeetBadgeImg,
  MeetBadgeHovor,
} from "./ProfileBadgeModal.style";


const BadgeModal = () => {
  const [hover, setHover] = useState<number>(0);
  const badges = useRecoilValue(ProfileState).badges
  const badgeList = useRecoilValue(BadgesState);
  const [showModal, setShowModal] = useRecoilState(BadgeModalShowState);

  return (
    <ModalContainer>
      <DialogBox>
        <ModalHeader>
          {/* <h3>마우스를 올리면 배지의 설명이 나타납니다.</h3> */}
        </ModalHeader>

        <h4 style={{color: "white"}} >내가 보유한 뱃지</h4>

        <BadgeContent>
          {badges !== undefined ? (
            badges.map((badge) => (
              <MeetBadgeDiv key={badge.id}>
                <MeetBadgeImg
                  onMouseEnter={() => setHover(badge.id)}
                  onMouseLeave={() => setHover(0)}
                  src={`/src/assets/Profile/badge/B${badge.id + 1}.png`}
                  alt=""
                />
                {hover !== 0 && hover === badge.id ? (
                  <MeetBadgeHovor $hoverActive={hover}>
                    <div className="hover-text"> {badge.name}</div>
                  </MeetBadgeHovor>
                ) : (
                  <></>
                )}
              </MeetBadgeDiv>
            ))
          ) : null }
        </BadgeContent>
        
        <hr style={{width: '400px'}}></hr>

        <BadgeContent>
          {badgeList !== undefined ? (
            badgeList.map((badge) => (
              (!badges.some(item => item.id === badge.id)) ?

                <MeetBadgeDiv key={badge.id}>
                  <MeetBadgeImg
                    onMouseEnter={() => setHover(badge.id)}
                    onMouseLeave={() => setHover(0)}
                    src={`/src/assets/Profile/badge/B${badge.id + 1}.png`}
                    alt=""
                  />
                  {hover !== 0 && hover === badge.id ? (
                    <MeetBadgeHovor $hoverActive={hover}>
                      <div className="hover-text"> {badge.name}</div>
                    </MeetBadgeHovor>
                  ) : (
                    <></>
                  )}
                </MeetBadgeDiv>
              : null
            ))
          ) : null }
        </BadgeContent>

      </DialogBox>
      <Backdrop onClick={()=>setShowModal(false)}/>
    </ModalContainer>
  );
};
export default BadgeModal;
