import DoughnutChart from "./DoughnutChart";
import {
    HistoryBoxDesign,
    HistoryTitleDesign,
    HistoryDetailDesign,
    HistoryDetailIconDesign,
    HistoryDetailNameDesign,
    HistoryContentDesign,
    HistoryTopPaddingDesign,
} from "./HistoryBox.style";


function HistoryBox() {
  return (
    <HistoryBoxDesign>
      <HistoryTitleDesign>연습기록</HistoryTitleDesign>
      <HistoryDetailDesign>
        <HistoryDetailIconDesign style={{backgroundColor: '#FFF8b7',}}></HistoryDetailIconDesign>
        <HistoryDetailNameDesign style={{width: '26%',}}>성별·연령</HistoryDetailNameDesign>
        <HistoryDetailIconDesign style={{backgroundColor: '#C3DAFF',}}></HistoryDetailIconDesign>
        <HistoryDetailNameDesign>연기</HistoryDetailNameDesign>
        <HistoryDetailIconDesign style={{backgroundColor: '#ABF9A9',}}></HistoryDetailIconDesign>
        <HistoryDetailNameDesign>발음</HistoryDetailNameDesign>
      </HistoryDetailDesign>
      <HistoryContentDesign>
        <DoughnutChart></DoughnutChart>
      </HistoryContentDesign>
      <HistoryTopPaddingDesign/>
    </HistoryBoxDesign>
  );
};

export default HistoryBox;