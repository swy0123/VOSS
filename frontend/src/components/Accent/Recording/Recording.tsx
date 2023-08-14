import { useRecoilState } from "recoil"
import { useEffect } from "react"
import { 
  accentRecordState, 
  accentRecordTimeState } from "../../../recoil/Training"
import { 
  Container, 
  DownloadImg, 
  RecordBox, 
  RecordItem, 
  RecordLable, 
  RecordSelect, 
  Title, 
  Warning } from "./Recording.style"

function Recording (){
  const [accentRecord] = useRecoilState(accentRecordState)
  const [timeList, setTimeList] = useRecoilState(accentRecordTimeState)
  
  const currentTime = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0")
    const time = `${hours}:${minutes}`
    setTimeList([time,...timeList.slice(0,4)])
  }

  useEffect(()=>{
    currentTime()
  },[accentRecord])

  return(
    <Container>
      <Title>녹음 기록</Title>
      <RecordBox>
        {accentRecord.map((file,index) => (
          <RecordItem key={index}>
            <RecordLable>
            voss-{timeList[index]}.mp3
            </RecordLable>
            <audio src={file} controls style={{
              width :'200px',
              height : '28px',
            }}/>
            <a href={file} download="my-audio-file.mp3">
              <DownloadImg src="/src/assets/Training/download.png"/>
            </a>
          </RecordItem>
        ))}
      </RecordBox>
      <Warning>녹음 파일은 최대 5개까지 기록 가능합니다.</Warning>
    </Container>
  )
}

export default Recording