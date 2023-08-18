import DoughnutChart from "./DoughnutChart";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { ProfileState } from '/src/recoil/Auth';
import { postRractice } from "/src/api/profile";
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
  const profile = useRecoilValue(ProfileState)
  const navigate = useNavigate();
  const goVoiceAnalysis = async () => {await postRractice("ACT"); navigate("/analysis")  }
  const goDubbingList = () => {navigate("/dubbinglist")}
  const goAccent = async () => {await postRractice("DICTION"); navigate("/accent")}


  return (
    <HistoryBoxDesign>
      <HistoryTitleDesign>연습기록</HistoryTitleDesign>
      { !profile.totalCnt
      ? <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '24vw', height: '70%', padding: '0 1.5vw', opacity: '0.8', fontSize: '1vw'}}>
        <p>기록이 없습니다</p>
        <p> 
          <span onClick={goVoiceAnalysis} style={{textDecoration: 'underline', cursor: 'pointer'}}>목소리 분석</span> ,{"\u00A0"}
          <span onClick={goDubbingList} style={{textDecoration: 'underline', cursor: 'pointer'}}>더빙 연습</span> ,{"\u00A0"}
          <span onClick={goAccent} style={{textDecoration: 'underline', cursor: 'pointer'}}>발음 연습</span>
          을 해보세요!
        </p>
        </div>
      : <>
      <HistoryDetailDesign>
        <HistoryDetailIconDesign style={{backgroundColor: '#FFF8b7',}}></HistoryDetailIconDesign>
        <HistoryDetailNameDesign style={{width: '26%',}}>성별·연령</HistoryDetailNameDesign>
        <HistoryDetailIconDesign style={{backgroundColor: '#C3DAFF',}}></HistoryDetailIconDesign>
        <HistoryDetailNameDesign>연기</HistoryDetailNameDesign>
        <HistoryDetailIconDesign style={{backgroundColor: '#ABF9A9',}}></HistoryDetailIconDesign>
        <HistoryDetailNameDesign>발음</HistoryDetailNameDesign>
      </HistoryDetailDesign>
      <HistoryContentDesign>
      {DoughnutChart(profile.totalCnt, profile.dictionCnt, profile.dubCnt, profile.actCnt)}
      </HistoryContentDesign>
      </>
      }
      <HistoryTopPaddingDesign/>
    </HistoryBoxDesign>
  );
};

export default HistoryBox;