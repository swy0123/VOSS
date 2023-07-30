import HistoryTemp from "../../../assets/ProfileImages/HistoryTemp.png";
import {
    HistoryBoxDesign,
    HistoryTitleDesign,
    HistoryContentDesign,
} from "./HistoryBox.style";




function HistoryBox() {
  return (
    <HistoryBoxDesign>
      <HistoryTitleDesign>연습기록</HistoryTitleDesign>
      <HistoryContentDesign><img src={HistoryTemp} alt=""/></HistoryContentDesign>
    </HistoryBoxDesign>
  );
};

export default HistoryBox;