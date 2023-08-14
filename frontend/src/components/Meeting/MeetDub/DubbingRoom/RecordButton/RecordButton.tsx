import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useReactMediaRecorder } from 'react-media-recorder';
import { MeetDubRecordState, RecordTriggerState, VideoTriggerState, dubbingRecordState } from '/src/recoil/HW_Atom';
import { recieveMsg, sendMsg } from '/src/recoil/MeetDub';
import { 
  Container,
  NowRecording,
  ParcticeInfo,
  ParcticeStartSection,
  PracticeEnd,
  PracticeStart,
  RecordBtn, 
  RecordBtnBox, 
  SectionBtn, 
  StopWatch, 
  Waves,
  FileDownload} from './RecordButton.style';

function RecordButton ({meetRoomId}: number) {
  const [meetDubRecord, setMeetDubRecord] = useRecoilState(MeetDubRecordState)
  const [recordTrigger,setRecordTrigger] = useRecoilState<number>(RecordTriggerState)
  const [practiceStart, setPracticeStart] = useState(false)
  const [practiceEnd, setPracticeEnd] = useState(false)
  const [initialBtn, setInitialBtn] = useState(true)
  const [isRunning, setIsRunning] = useState(false);
  
  // 스크립트 스크롤, 영상 자동정지 를 위한 State
  const intervalRef = useRef<number|null>(null);
  const [time, setTime] = useState(0);
  const stopRef = useRef<number|null>(null);
  const [stop, setStop] = useState(0);

  // 더빙 영상 동시제어
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);

  const { 
    startRecording, 
    stopRecording, 
    clearBlobUrl,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  const startOrStop = () => {
    if (!isRunning) {
      setIsRunning(true);

      //녹음 시간
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      // 녹음 시간 영상시간 제한
      stopRef.current = setInterval(() => {
        setStop((prevTime) => prevTime + 1);
      }, 100);
    }
    else if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      clearInterval(stopRef.current);
      setIsRunning(false);
    }
    setInitialBtn(false)
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setInitialBtn(true)
    setIsRunning(false);
    setTime(0);
  };
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const addRecord = (mediaBlobUrl) => {
    setMeetDubRecord(mediaBlobUrl)
  }

  // 연습 멈춤 -> 재시작
  const changePracticeEnd = () => {
    setPracticeStart(false)
    setPracticeEnd(true)
  }

  // 연습 진행중 -> 정지 및 종료
  const changePracticeStart = () => {
    setPracticeStart(true)
    setPracticeEnd(false)
    
  }

  // (Record) 처음 영상 시작 
  const RecordChangeReady = () => {
    setSend("/recordstartvideo")
  }

  // (Record) 영상 처음으로
  const RecordChangeReset = () => {
    setSend("/recordresetvideo")
  }

  useEffect(() => {
    if(recieve=="/recordstartvideo") {
      startOrStop()
      setRecordTrigger(1)
      setRecieve("/none");
    }
    else if(recieve=="/recordresetvideo") {
      startOrStop()
      setRecordTrigger(0)
      resetTimer()
      setRecieve("/none");
    }
  },[recieve])

  return(
    <Container>
      <RecordBtnBox>
        <StopWatch>{formatTime(time)}</StopWatch>
        <SectionBtn>
        <PracticeStart $practiceStart={practiceStart}>연습 시작</PracticeStart>
        <PracticeEnd $practiceEnd={practiceEnd}>연습 종료</PracticeEnd>
        { isRunning ? 
          (<NowRecording>
            <RecordBtn
              onClick={() => {
                changePracticeStart()
                RecordChangeReset()}}
              onMouseEnter={() => 
                setPracticeEnd(true)}
              onMouseLeave={() => {
                setPracticeStart(false)
                setPracticeEnd(false)}}
              src="/src/assets/Training/stopbtn.png">
            </RecordBtn>
            <Waves/>
          </NowRecording>
          ) : (
            <ParcticeStartSection>
            <RecordBtn
              onClick={() => {
                changePracticeEnd()
                RecordChangeReady()}}
              onMouseEnter={() => 
                setPracticeStart(true)}
              onMouseLeave={() => {
                setPracticeStart(false)
                setPracticeEnd(false)}}
              src="/src/assets/Training/startbtn.png"></RecordBtn>
            <ParcticeInfo>녹음과함께 재생</ParcticeInfo>
          </ParcticeStartSection>
          )
        }
        </SectionBtn>
        <a href={meetDubRecord} download="my-audio-file.mp3">
          <FileDownload src="/src/assets/Meeting/download.png"></FileDownload>
        </a>
      </RecordBtnBox>
    </Container>
  )
}
export default RecordButton

