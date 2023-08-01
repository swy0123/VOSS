import DoughnutChart from "./DoughnutChart";
import DoughnutCount from './DoughnutCount';
import {
    HistoryBoxDesign,
    HistoryTitleDesign,
    HistoryContentDesign,
} from "./HistoryBox.style";




function HistoryBox() {
  return (
    <HistoryBoxDesign>
      <HistoryTitleDesign>연습기록</HistoryTitleDesign>
      <HistoryContentDesign>
        <DoughnutChart></DoughnutChart>
        <DoughnutCount></DoughnutCount>
      </HistoryContentDesign>
    </HistoryBoxDesign>
  );
};

export default HistoryBox;