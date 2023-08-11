import React, { PropsWithChildren, useState, MouseEvent, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BadgeModalShowState, BadgesState, ProfileState } from "/src/recoil/Auth";
import { BadgeType } from "/src/type/Auth";
import { selectedMember } from "/src/recoil/Meeting";
import {
  ModalContainer,
  DialogBox,
  Backdrop,
  ModalHeader,
  BadgeContent,
  MeetBadgeDiv,
  MeetBadgeImg,
  MeetBadgeImg2,
  MeetBadgeHovor,
} from "./ProfileBadgeModal.style";

interface BadgeListType {
  id: number,
  name: string,
};  

const BadgeModal = () => {
  const [hover, setHover] = useState<number>(0);
  const [hover2, setHover2] = useState<number>(0);
  const badges: BadgeType[] = useRecoilValue(ProfileState).badges
  const badgeList = useRecoilValue<BadgeListType[]>(BadgesState);
  const [showModal, setShowModal] = useRecoilState(BadgeModalShowState);

  return (
    <ModalContainer>
      <DialogBox>
        <ModalHeader>
          <h3>마우스를 올리면 배지의 설명이 나타납니다.</h3>
        </ModalHeader>
        <br/>

        <BadgeContent>
          {badges !== undefined ? (
            badges.map((badge) => (
              <MeetBadgeDiv key={badge.id}>
                <MeetBadgeImg
                  onMouseEnter={() => setHover(badge.id||0)}
                  onMouseLeave={() => setHover(0)}
                  src={`/src/assets/Profile/badge/B${badge.id}.png`}
                  alt=""
                />
                {/* { !hover
                ? 
                && hover === badge.id ? ( */}
                  <MeetBadgeHovor $hoverActive={hover}>
                    { hover === 0
                    ? badge.cnt
                    : hover === badge.id
                      ? badge.name
                      : "\u00A0"
                    }
                    {/* <div className="hover-text"> {badge.name}</div> */}
                  </MeetBadgeHovor>
                {/* ) : (
                  <MeetBadgeHovor>{badge.cnt}</MeetBadgeHovor>
                )} */}
              </MeetBadgeDiv>
            ))
          ) : null }
        </BadgeContent>
        
        <hr style={{width: '400px', opacity: '0.5'}}></hr>

        <BadgeContent>
          {badgeList !== undefined ? (
            badgeList.map((badge) => (
              (!badges.some(item => item.id === badge.id)) ?

                <MeetBadgeDiv key={badge.id}>
                  <MeetBadgeImg2
                    onMouseEnter={() => setHover2(badge.id)}
                    onMouseLeave={() => setHover2(0)}
                    src={`/src/assets/Profile/badge/B${badge.id}.png`}
                    alt=""
                  />
                  {hover2 !== 0 && hover2 === badge.id ? (
                    <MeetBadgeHovor $hoverActive={hover2}>
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
