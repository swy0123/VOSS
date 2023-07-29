import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { analysisRecordState, analysisRecordTimeState } from "../../recoil/hw_atom";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0px 0px 20px 0px;
`
const Title = styled.h2`
  color: white;
  text-align: center;
`
const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 185px;
`
const RecordItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  width: 370px;
  margin : 2px 0px 2px 9px;
`
const RecordSelect = styled.input` 
  width: 18px;
  height: 18px;
`

const RecordLable = styled.label`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 100;
  line-height: 30px;
  color: white;
  
`
const DownloadImg = styled.img`
  height: 16px;
`
const Warning = styled.div`
  color: #BABABA;
  font-size: 12px;
  margin-top: 8px;
  text-align: end;
`

function Recording (){
  const [analysisRecord] = useRecoilState(analysisRecordState)
  // const [timeList, setTimeList] = useState([])
  const [timeList, setTimeList] = useRecoilState(analysisRecordTimeState)
  
  const currentTime = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2,"0")
    const minutes = String(date.getMinutes()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0")
    const time = `${hours}-${minutes}-${seconds}`
    setTimeList([time,...timeList.slice(0,4)])
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
            "voss"{timeList[index]}.mp3
            </RecordLable>
            <audio src={file} controls style={{
              width :'100px',
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