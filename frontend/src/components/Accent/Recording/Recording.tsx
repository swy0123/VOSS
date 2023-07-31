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
  const TmpFile = [
    "voss_username_23-07-11-16-12.mp3",
    "voss_username_23-07-11-16-12.mp3",
    "voss_username_23-07-11-16-12.mp3",
    "voss_username_23-07-11-16-12.mp3",
    "voss_username_23-07-11-16-12.mp3",
  ]

  return(
    <Container>
      <Title>녹음 기록</Title>
      <RecordBox>
        {TmpFile.map((data,index) => (
          <RecordItem key={index}>
            <RecordSelect type="radio" name="record"/>
            <RecordLable>{data}</RecordLable>
            <DownloadImg src="/src/assets/Training/download.png"></DownloadImg>
          </RecordItem>
        ))}
      </RecordBox>
      <Warning>녹음 파일은 최대 5개까지 기록 가능합니다.</Warning>
    </Container>
  )
}

export default Recording