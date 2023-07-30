import BadgeTemp from "../../../assets/ProfileImages/BadgeTemp.png";
import {
    BadgeBoxDesign,
    BadgeTitleDesign,
    BadgeContentDesign,
} from "./BadgeBox.style";



function BadgeBox() {
  return (
    <BadgeBoxDesign>
      <BadgeTitleDesign>활동 뱃지</BadgeTitleDesign>
      <BadgeContentDesign><img src={BadgeTemp} alt=""/></BadgeContentDesign>
    </BadgeBoxDesign>
  );
};

export default BadgeBox;