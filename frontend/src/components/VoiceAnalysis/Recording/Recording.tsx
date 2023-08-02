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

  const downloadBlob = (file) => {
    const file1 = new Blob([file], { type: 'audio/wav' });
    // Blob 객체의 MIME 타입 확인
    console.log('Blob MIME Type:', file1.type);

    // 다운로드할 파일의 확장자가 "wav"인 경우에 MIME 타입 설정
    if (file1.type === 'audio/wav') {
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(file1);
      anchor.download = 'my-audio-file.wav';
      anchor.click();
    }
  };

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
            <button onClick={()=>downloadBlob(file)}>type</button>
          </RecordItem>
        ))}
      </RecordBox>
      <Warning>녹음 파일은 최대 5개까지 기록 가능합니다.</Warning>
    </Container>
  )
}

export default Recording