import { useState } from "react";
import { useRecoilState } from "recoil";
import { ProfileState } from "/src/recoil/Auth";
import BadgeTemp from "../../../assets/Profile/BadgeTemp.png";
import {
    BadgeBoxDesign,
    BadgeTitleDesign,
    BadgeContentDesign,
} from "./BadgeBox.style";



function BadgeBox() {
  const [profile, setProfile] = useRecoilState(ProfileState)
  const [tmp, setTmp] = useState(["더미","더미","더미","더미","더미","더미","더미","더미","더미"])
  return (
    <BadgeBoxDesign
      style={{
      paddingBottom: "70px"
    }}>
      {/* 임시 방편 수정 해주세요!! */}
      <BadgeTitleDesign>활동 뱃지</BadgeTitleDesign>      
      {/* <BadgeContentDesign><img src={BadgeTemp} alt=""/></BadgeContentDesign>
      {profile.badges.map(badge => (
        <span>{badge}</span>
      ))} */}

      <BadgeContentDesign
        style={{
          marginLeft:"130px",
          paddingBottom: "100px"
        }}>
        {tmp.map((badge,index) => (
          <img style={{
            height : "200px",
            width:"200px",
            margin:"30px"}} src={`/src/assets/Profile/badge/B${index+1}.png`} alt=""/>
        ))}
      </BadgeContentDesign>

    </BadgeBoxDesign>
  );
};

export default BadgeBox;