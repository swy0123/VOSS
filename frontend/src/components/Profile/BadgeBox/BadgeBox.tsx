import { useState } from "react";
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
  // const badges = useRecoilValue(ProfileState).badges
  const badges = [
    { "id": 1, cnt: 1, "name": "여자 청소년 목소리 능력자" },
    { "id": 2, cnt: 1,"name": "중년 여성 목소리 능력자" },
    { "id": 3, cnt: 1,"name": "장년 여성 목소리 능력자" },
    { "id": 4, cnt: 1,"name": "여자 어린이 목소리 능력자" },
    { "id": 5, cnt: 1,"name": "남자 어린이 목소리 능력자" },
    { "id": 6,cnt: 1, "name": "남자 청소년 목소리 능력자" },
    { "id": 7,cnt: 1, "name": "중년 여성 목소리 능력자" },
    { "id": 8, cnt: 1,"name": "장년 남성 목소리 능력자" },
    { "id": 9, cnt: 1,"name": "인간 목소리 분석기" },
    { "id": 10,cnt: 1, "name": "성대모사의 달인" },
    { "id": 11,cnt: 1, "name": "인기스타" },
    { "id": 12,cnt: 1, "name": "무엇이든 물어보세요(고인물)" },
    // { "id": 13,cnt: 1,"name": "피리부는 사나이" }
  ];

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

            { select && select === badge.id
            ? <BadgeBoxContent $hoverActive={select}>
                <div style={{height: '2.5vw', display: 'flex', alignItems: 'center'}}>{badge.name}</div>
              </BadgeBoxContent>
            : <BadgeBoxContent2>{badge.cnt}</BadgeBoxContent2>
          }
          </BadgeItemDesign>
        ))}
      </BadgeContentDesign>
    
    <BadgeTopPaddingDetailDesign/>
    <BadgeTopPaddingDetailDesign/>
    
    { showModal ? <ProfileBadgeModal/> : null }

    </BadgeBoxDesign>
  );
};

export default BadgeBox;