import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { analysisRecordState, analysisRecordTimeState } from "../../../recoil/Training";
import { analysisResultState } from "/src/recoil/HW_Atom";
import { 
  Container, 
  DownloadImg, 
  RecordBox, 
  RecordItem, 
  RecordLable, 
  RecordSelect, 
  Title, 
  Warning} from "./Recording.style";
  
import axios from "axios";
import { Dubbing } from './../../../pages/SelectCategory/SelectCategory.style';

function Recording (){
  const [analysisRecord] = useRecoilState(analysisRecordState)
  const [analysisResult,setAnalysisResult] = useRecoilState(analysisResultState)
  
  const [timeList, setTimeList] = useRecoilState(analysisRecordTimeState)
  
  const currentTime = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0")
    const time = `${hours}:${minutes}`
    setTimeList([time,...timeList.slice(0,4)])
  }

  // Axios 나중에 옮겨 놓을게ㅎㅎㅎㅎ
  const startVoiceAnalysis = async (blobURL:string) =>{
    const response = await fetch(blobURL);
    const blobData = await response.blob();
    setAnalysisResult("목소리 분석중...")
    try {
      const formData = new FormData();
      const blob = new Blob([blobData], {type: "audio/webm;codecs=opus"});
      formData.append("file", blob, "test.webm");

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios.post("https://courtney.reverof.p-e.kr:5000/classify", formData, config);
      
      let gender =""
      do {
        if (response.data.gender==="male") {gender = "남성"}
      else if (response.data.gender==="female") {gender = "여성"}
      } while (!gender);
      setAnalysisResult(`${response.data.age}대 ${gender}입니다.`)
    } 
    catch (error) {
      console.error('네트워크 오류:', error);
    }
  }

  useEffect(()=>{
    currentTime()
  },[analysisRecord])

  return(
    <Container>
      <Title>녹음 기록</Title>
      <RecordBox>
        {analysisRecord.map(([file, recordedAge, recordedGender] ,index) => (
          <RecordItem key={index}>
            <RecordLable>
            voss-{timeList[index]}-<br/>
            {recordedAge}-{recordedGender}.wav
            </RecordLable>
            <audio src={file} controls style={{
              width :'40%',
              height : '28px',
            }}/>
            <a href={file} download={`voss-${timeList[index]}-${recordedAge}-${recordedGender}.wav`}>
              <DownloadImg src="/src/assets/Training/download.png"/>
            </a>
            <DownloadImg src="/src/assets/Dubbing/Analisis.png" onClick={()=>startVoiceAnalysis(file)}/>
          </RecordItem>
        ))}
      </RecordBox>
      <Warning>녹음 파일은 최대 5개까지 기록 가능합니다.</Warning>
    </Container>
  )
}

export default Recording