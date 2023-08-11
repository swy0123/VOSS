import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useReactMediaRecorder } from 'react-media-recorder';
import { dubbingRecordState, youtubeState } from '/src/recoil/HW_Atom';
import { 
  CompleteBtn,
  NowRecording,
  PracticeEnd,
  PracticeStart,
  RecordBox, 
  RecordBtn, 
  RestartBtn, 
  SectionBtn, 
  StopWatch, 
  Waves} from './RecordButton.style';
import { PlayChangebState } from '/src/recoil/Training';
import axios from "axios";
import { Line } from '/src/type/type';

interface VideoProps {
  lines : Line[]
}

function RecordButton ({lines}: VideoProps) {
  const [dubbingRecord, setdubbingRecord] = useRecoilState(dubbingRecordState)
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const [practiceStart, setPracticeStart] = useState(false)
  const [practiceEnd, setPracticeEnd] = useState(false)
  const [initialBtn, setInitialBtn] = useState(true)
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number|null>(null);
  const [time, setTime] = useState(0);

  const { 
    startRecording, 
    stopRecording, 
    clearBlobUrl,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl } = useReactMediaRecorder({ audio: true, 
      video: false,
      mediaRecorderOptions: {
        mimeType: 'audio/webm;codecs=opus',
      } });

  const startOrStop = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    else if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
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
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const addRecord = async (mediaBlobUrl:string) => {
    const response = await fetch(mediaBlobUrl);
    const blobData = await response.blob();

    try {
      const formData = new FormData();
      const blob = new Blob([blobData], {type: "audio/webm;codecs=opus"});
      formData.append("file", blob, "tmp.webm");

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
        responseType: 'blob',
      };
      const res = await axios.post("https://courtney.reverof.p-e.kr:5000/combine?parts=26:147&parts=182:210&parts=253:337&parts=402:438", formData, config);
      const newBlob = new Blob([res.data], {type: "audio/mp3"})
      const audioBlobURL = URL.createObjectURL(newBlob);
  
      setdubbingRecord([audioBlobURL,...dubbingRecord.slice(0,4)])
    } catch (error) {
      console.error('Error fetching merged audio:', error);
    }
  }

  const changePracticeEnd = () => {
    setPracticeStart(false)
    setPracticeEnd(true)
  }

  const changePracticeStart = () => {
    setPracticeStart(true)
    setPracticeEnd(false)
  }

  // // 영상 플레이
  // const SelfPlayVideo = () => {
  //   youtube.playVideo()
  //   setPlayChange([1, Math.floor(youtube.getCurrentTime())]);
  // }
  
  // // 영상 일시정지
  // const SelfPauseVideo = () => {
  //   youtube.pauseVideo()
  //   setPlayChange([2, Math.floor(youtube.getCurrentTime())]);
  // }

  return(
    <RecordBox>
      <StopWatch>{formatTime(time)}</StopWatch>
      <PracticeStart $practiceStart={practiceStart}>연습 시작</PracticeStart>
      <PracticeEnd $practiceEnd={practiceEnd}>연습 종료</PracticeEnd>
      <SectionBtn>
      { !initialBtn && !isRunning ?
            <RestartBtn
              onClick={() => {
                resetTimer()
                stopRecording()
                clearBlobUrl()}}>취소</RestartBtn> : ""}

            { initialBtn ? 
              (<RecordBtn
                onClick={() => {
                  startOrStop()
                  startRecording()
                  changePracticeEnd()}}
                onMouseEnter={() => 
                  setPracticeStart(true)}
                onMouseLeave={() => {
                  setPracticeStart(false)
                  setPracticeEnd(false)}}
                src="/src/assets/Training/startbtn.png"></RecordBtn>) :
              isRunning ? 
                (<NowRecording>
                  <RecordBtn
                    onClick={() => {
                      startOrStop()
                      stopRecording()
                      pauseRecording()
                      changePracticeStart()}}
                    onMouseEnter={() => 
                      setPracticeEnd(true)}
                    onMouseLeave={() => {
                      setPracticeStart(false)
                      setPracticeEnd(false)}}
                    src="/src/assets/Training/stopbtn.png">
                    </RecordBtn>
                    <Waves/>
                  </NowRecording>) :
                (<RecordBtn
                  onClick={() => {
                    startOrStop()
                    resumeRecording()
                    changePracticeEnd()}}
                  onMouseEnter={() => 
                    setPracticeStart(true)}
                  onMouseLeave={() => {
                    setPracticeStart(false)
                    setPracticeEnd(false)}}
                  src="/src/assets/Training/restartbtn.png"></RecordBtn>)}

            { !initialBtn && !isRunning ?
            <CompleteBtn
                onClick={() => {
                    stopRecording()
                    addRecord(mediaBlobUrl)
                    resetTimer()
                  }}>완료</CompleteBtn> : "" }
      </SectionBtn>
    </RecordBox>
  )
}
export default RecordButton