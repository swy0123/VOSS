import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProfileState } from "/src/recoil/Auth";
import { BadgeType } from "/src/type/Auth";
import {
  BadgeBoxDesign,
  BadgeTitleDesign,
  BadgeContentDesign,
  BadgeItemDesign,
  BadgeBoxContent,
} from "./BadgeBox.style";



function BadgeBox() {
  const [select, setSelect] = useState<number>(0);
  const badges = useRecoilValue(ProfileState).badges

  return (
    <BadgeBoxDesign>
      <BadgeTitleDesign>활동 뱃지</BadgeTitleDesign>      

      <BadgeContentDesign>
        {badges.map((badge: BadgeType) => (
          <BadgeItemDesign key={badge.id}>
            <img src={`/src/assets/Profile/badge/B${badge.id}.png`} alt=""
            onMouseEnter={()=>setSelect(badge.id||0)}
            onMouseLeave={()=>setSelect(0)}/>
            <BadgeBoxContent $hoverActive={select}>
            { !select
            ? badge.cnt
            : select === badge.id
              ? badge.name
              : "\u00A0"
            }
            </BadgeBoxContent>
          </BadgeItemDesign>
        ))}
      </BadgeContentDesign>

    </BadgeBoxDesign>
  );
};

export default BadgeBox;