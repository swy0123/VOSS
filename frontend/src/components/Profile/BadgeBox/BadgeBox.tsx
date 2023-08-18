import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProfileState, BadgeModalShowState } from "/src/recoil/Auth";
import { BadgeType } from "/src/type/Auth";
import ProfileBadgeModal from "./ProfileBadgeModal"
import {
  BadgeBoxDesign,
  BadgeTitleDesign,
  BadgeTitleDetailDesign,
  BadgeTopPaddingDetailDesign,
  BadgeContentDesign,
  BadgeItemDesign,
  BadgeBoxContent,
  BadgeBoxContent2,
} from "./BadgeBox.style";


function BadgeBox() {
  const [select, setSelect] = useState<number>(0);
  const [showModal, setShowModal] = useRecoilState(BadgeModalShowState);
  const badges = useRecoilValue(ProfileState).badges;
  const navigate = useNavigate();
  const goMeeting = () => navigate('/meeting');

  return (
    <BadgeBoxDesign>
      <BadgeTitleDesign>
        활동 배지
        <BadgeTitleDetailDesign onClick={()=>setShowModal(true)}>자세히 보기 〉</BadgeTitleDetailDesign>
      </BadgeTitleDesign>      

      { badges.length > 0
      ? <BadgeContentDesign onClick={()=>setShowModal(true)}>
        {badges.map((badge: BadgeType) => (
          <BadgeItemDesign key={badge.id}>
            <img src={`/src/assets/Profile/badge/B${badge.id}.png`} alt=""
            onMouseEnter={()=>setSelect(badge.id||0)}
            onMouseLeave={()=>setSelect(0)}/>

            { select && select === badge.id
            ? <BadgeBoxContent $hoverActive={select}>
                <div style={{marginBottom: '-0.2vw', height: '1.5vw', display: 'flex', alignItems: 'center'}}>{badge.name}</div>
              </BadgeBoxContent>
            : <BadgeBoxContent2>{badge.cnt}</BadgeBoxContent2>
          }
          </BadgeItemDesign>
        ))}
      </BadgeContentDesign>
      : <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '24vw', height: '70%', padding: '0 1.5vw', opacity: '0.8', fontSize: '1vw'}}>
        <p>배지가 없습니다</p>
        <p> <span onClick={goMeeting} style={{textDecoration: 'underline', cursor: 'pointer'}}>화상 연습</span>에서 사람들과 함께 연습하고 배지를 받아보세요!</p>
      </div>
      }

    <BadgeTopPaddingDetailDesign/>
    <BadgeTopPaddingDetailDesign/>
    
    { showModal ? <ProfileBadgeModal/> : null }

    </BadgeBoxDesign>
  );
};

export default BadgeBox;