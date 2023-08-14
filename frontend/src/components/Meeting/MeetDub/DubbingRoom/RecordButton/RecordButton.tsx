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
  FileDownload,
  FileDownloadImg} from './RecordButton.style';
import { postStartRecording } from '/src/api/recoding';
import { RecordingInfo } from '/src/type/hw_type';
import { AxiosResponse } from 'axios';

function RecordButton ({meetRoomId}: number | any) {
  const [meetDubRecord, setMeetDubRecord] = useRecoilState(MeetDubRecordState)
  const [recordTrigger,setRecordTrigger] = useRecoilState<number>(RecordTriggerState)
  const [practiceStart, setPracticeStart] = useState(false)
  const [practiceEnd, setPracticeEnd] = useState(false)
  const [initialBtn, setInitialBtn] = useState(true)
  const [isRunning, setIsRunning] = useState(false);
  
  // 스크립트 스크롤, 영상 자동정지 를 위한 State
  const intervalRef = useRef<number|undefined>(undefined);
  const [time, setTime] = useState(0);
  const stopRef = useRef<number|undefined>(undefined);
  const [stop, setStop] = useState(0);

  // 더빙 영상 동시제어
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);

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
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setInitialBtn(true)
    setIsRunning(false);
    setTime(0);
  };
  
  const addRecord = (mediaBlobUrl) => {
    setMeetDubRecord(mediaBlobUrl)
  }

  const StartRecord = () => {
    const info: RecordingInfo = {
      "meetRoomId": meetRoomId,
      "command" : "START"
    }
    void axiosRecording(info).then().catch(error=>console.log(error))
  }
  
  const StopRecord = async() => {
    const info: RecordingInfo = {
      "meetRoomId": meetRoomId,
      "command" : "STOP"
    }
    const file = await axiosRecording(info).then().catch(error=>console.log(error))
    // console.log("여기요~~~",file.data.url)
    setMeetDubRecord(file.data.url)
    setSend(`/updaterecord${file.data.url}`)
  }

  const axiosRecording = async (info:RecordingInfo):Promise<void> => {
    try {
      const response:AxiosResponse<string|undefined> = await postStartRecording(info);
      // console.log("화상 더빙 녹음 ==",response)
      return response
    } 
    catch (error) {
      console.log(error);
    }
  };

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

  // (Record) 영상/녹화 동시에 시작 
  const RecordChangeReady = () => {
    setSend("/recordstartvideo")
  }

  // (Record) 영상/녹화 동시에 종료
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
    else if(recieve.slice(0,13)=="/updaterecord") {
      console.log("통신이 잘 되는가",recieve.slice(13))
      setMeetDubRecord(recieve.slice(13))
      setRecieve("/none");
    }
  },[recieve])

  const downloadVideo = async ():Promise<void> => {
    const videoUrl = meetDubRecord

    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-video.webm'; // 파일명 설정
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

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
                RecordChangeReset()
                StopRecord()}}
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
                RecordChangeReady()
                StartRecord()}}
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
        {meetDubRecord &&
        <FileDownload onClick={downloadVideo}>
          <FileDownloadImg src="/src/assets/Meeting/download.png"></FileDownloadImg>
        </FileDownload>
        }
      </RecordBtnBox>
    </Container>
  )
}
export default RecordButton

