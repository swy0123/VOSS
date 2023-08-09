import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProfileState } from "/src/recoil/Auth";
import { BadgeType } from "/src/type/Auth";
import {
    BadgeBoxDesign,
    BadgeTitleDesign,
    BadgeContentDesign,
    BadgeItemDesign,
} from "./BadgeBox.style";



function BadgeBox() {
  const badges = useRecoilValue(ProfileState).badges
  // const badges = [
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 5, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 2, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 4, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 6, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  //   {id: 1, cnt: 3, name: "asdasdas"},
  // ]

  return (
    <BadgeBoxDesign>
      <BadgeTitleDesign>활동 뱃지</BadgeTitleDesign>      

      <BadgeContentDesign>
        {badges.map((badge: BadgeType) => (
          <BadgeItemDesign>
          <img src={`/src/assets/Profile/badge/B${badge.id}.png`} alt=""/>
          <span>{badge.cnt}</span>
          </BadgeItemDesign>
        ))}
      </BadgeContentDesign>

    </BadgeBoxDesign>
  );
};

export default BadgeBox;