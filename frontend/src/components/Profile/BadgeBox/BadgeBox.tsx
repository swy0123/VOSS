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
  return (
    <BadgeBoxDesign>
      <BadgeTitleDesign>활동 뱃지</BadgeTitleDesign>
      <BadgeContentDesign><img src={BadgeTemp} alt=""/></BadgeContentDesign>
      {profile.badges.map(badge => (
        <span>{badge}</span>
      ))}
    </BadgeBoxDesign>
  );
};

export default BadgeBox;