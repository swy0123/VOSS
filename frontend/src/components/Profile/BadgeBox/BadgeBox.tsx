import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProfileState, BadgeModalShowState } from "/src/recoil/Auth";
import { BadgeType } from "/src/type/Auth";
import ProfileBadgeModal from "./ProfileBadgeModal"
import {
  BadgeBoxDesign,
  BadgeTitleDesign,
  BadgeTitleDetailDesign,
  BadgeContentDesign,
  BadgeItemDesign,
  BadgeBoxContent,
} from "./BadgeBox.style";


function BadgeBox() {
  const [select, setSelect] = useState<number>(0);
  const [showModal, setShowModal] = useRecoilState(BadgeModalShowState);
  const badges = useRecoilValue(ProfileState).badges

  return (
    <BadgeBoxDesign>
      <BadgeTitleDesign>
        활동 뱃지
        <BadgeTitleDetailDesign onClick={()=>setShowModal(true)}>자세히 보기 〉</BadgeTitleDetailDesign>
      </BadgeTitleDesign>      

      <BadgeContentDesign onClick={()=>setShowModal(true)}>
        {badges.map((badge: BadgeType) => (
          <BadgeItemDesign key={badge.id}>
            <img src={`/src/assets/Profile/badge/B${badge.id}.png`} alt=""
            onMouseEnter={()=>setSelect(badge.id||0)}
            onMouseLeave={()=>setSelect(0)}/>
            <BadgeBoxContent $hoverActive={select}>
            { !select
            ? 1 
            : select === badge.id
              ? <div style={{height: '2.5vw', display: 'flex', alignItems: 'center'}}>{badge.name}</div>
              : "\u00A0"  
            }
            </BadgeBoxContent>
          </BadgeItemDesign>
        ))}
      </BadgeContentDesign>
    
    { showModal ? <ProfileBadgeModal/> : null }

    </BadgeBoxDesign>
  );
};

export default BadgeBox;