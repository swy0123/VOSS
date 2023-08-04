import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { analysisRecordState, analysisRecordTimeState } from "../../../recoil/Training";
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

function Recording (){
  const [analysisRecord] = useRecoilState(analysisRecordState)
  const [timeList, setTimeList] = useRecoilState(analysisRecordTimeState)
  
  const currentTime = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0")
    const time = `${hours}-${minutes}-${seconds}`
    setTimeList([time,...timeList.slice(0,4)])
  }

  // Axios 나중에 옮겨 놓을게ㅎㅎㅎㅎ
  const startVoiceAnalysis = async (blobURL:string) =>{
    const response = await fetch(blobURL);
    const blobData = await response.blob();

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
  
      console.log('서버 응답:', response);
    } catch (error) {
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
        {analysisRecord.map((file,index) => (
          <RecordItem key={index}>
            <RecordSelect type="radio" name="record"/>
            <RecordLable>
            "voss"{timeList[index]}.wav
            </RecordLable>
            <audio src={file} controls style={{
              width :'100px',
              height : '28px',
            }}/>
            <a href={file} download="my-audio-file.wav">
              <DownloadImg src="/src/assets/Training/download.png"/>
            </a>
            <button onClick={()=>startVoiceAnalysis(file)}>분석</button>
          </RecordItem>
        ))}
      </RecordBox>
      <Warning>녹음 파일은 최대 5개까지 기록 가능합니다.</Warning>
    </Container>
  )
}

export default Recording