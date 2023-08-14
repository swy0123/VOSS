import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useReactMediaRecorder } from 'react-media-recorder';
import { PlayTriggerState, dubbingRecordState, youtubeState } from '/src/recoil/HW_Atom';
import {
  CompleteBtn,
  MoonLoaderDiv,
  NowRecording,
  PracticeEnd,
  PracticeStart,
  PreventClickDiv,
  RecordBox,
  RecordBtn,
  RestartBtn,
  SectionBtn,
  StopWatch,
  Waves
} from './RecordButton.style';
import { PlayChangebState, ScriptSelectState } from '/src/recoil/Training';
import axios from "axios";
import { Line, Script } from '/src/type/type';
import { MoonLoader } from "react-spinners";

interface VideoProps {
  script: Script
  lines: Line[]
}

function RecordButton({ script, lines }: VideoProps) {
  const [dubbingRecord, setdubbingRecord] = useRecoilState(dubbingRecordState)
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const [playTrigger, setPlayTrigger] = useRecoilState<number>(PlayTriggerState)
  const [isScriptSelect, setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  const [practiceStart, setPracticeStart] = useState(true)
  const [practiceEnd, setPracticeEnd] = useState(false)
  const [initialBtn, setInitialBtn] = useState(true)
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const stopRef = useRef<number | null>(null);
  const [stop, setStop] = useState(0);

  const [recordBtnClickable, setRecordBtnClickable] = useState<boolean>(true);

  const {
    startRecording,
    stopRecording,
    clearBlobUrl,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl } = useReactMediaRecorder({
      audio: true,
      video: false,
      mediaRecorderOptions: {
        mimeType: 'audio/webm;codecs=opus',
      }
    });

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

  const getParamStr = () => {
    let param = ""

    for (var i = 0; i < lines.length; i++) {
      if (!isScriptSelect[i]) continue;
      param += "&parts=" + lines[i].startSec + ":" + lines[i].endSec;
    }

    return param;
  }

  const addRecord = async (mediaBlobUrl: string | undefined) => {
    setRecordBtnClickable(false);

    const response = await fetch(mediaBlobUrl);
    const blobData = await response.blob();

    try {
      const url = "https://courtney.reverof.p-e.kr:5000/combine?id=" + script.id + getParamStr();
      const formData = new FormData();
      const blob = new Blob([blobData], { type: "audio/webm;codecs=opus" });
      formData.append("file", blob, "tmp.webm");

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        'responseType': 'blob',
      };
      const res = await axios.post(url, formData, config);
      const newBlob = new Blob([res.data], { type: "audio/mp3" })
      const audioBlobURL = URL.createObjectURL(newBlob);

      setdubbingRecord([audioBlobURL, ...dubbingRecord.slice(0, 4)])
    } catch (error) {
      console.error('Error fetching merged audio:', error);
    }
    setRecordBtnClickable(true)
  }

  // 연습이 멈춤 -> 재시작
  const changePracticeEnd = () => {
    setPracticeStart(false)
    setPracticeEnd(true)
    setPlayTrigger(1)
  }

  // 연습이 진행중 -> 정지
  const changePracticeStart = () => {
    setPracticeStart(true)
    setPracticeEnd(false)
    setPlayTrigger(2)
  }

  // 연습 다시시작 준비
  const changePracticeReset = () => {
    setPlayTrigger(0)
  }

  // 녹음 시간 영상시간 제한
  useEffect(() => {
    if (stop === script.durationInSec * 10) {
      startOrStop()
      stopRecording()
      setPracticeStart(true)
      setPracticeEnd(false)
      setTimeout(() => {
        setPlayTrigger(2)
      }, 2500)
    }
  }, [stop])

  return (
    <RecordBox>
      <StopWatch>{formatTime(time)}</StopWatch>
      <PracticeStart $practiceStart={practiceStart}>연습 시작</PracticeStart>
      <PracticeEnd $practiceEnd={practiceEnd}>연습 종료</PracticeEnd>
      <SectionBtn $IsClickable={recordBtnClickable}>
        <MoonLoaderDiv>
          {recordBtnClickable ? <></> :
            <MoonLoader
              color="white"
              size={70}
            />
          }
        </MoonLoaderDiv>
        {!initialBtn && !isRunning ?
          <RestartBtn
            onClick={() => {
              setStop(0)
              resetTimer()
              stopRecording()
              changePracticeReset()
              clearBlobUrl()
            }}>취소</RestartBtn> : ""}

        {initialBtn ?
          (<RecordBtn
            onClick={() => {
              startOrStop()
              startRecording()
              changePracticeEnd()
            }}
            onMouseEnter={() =>
              setPracticeStart(true)}
            src="/src/assets/Training/startbtn.png"></RecordBtn>) :
          isRunning ?
            (<NowRecording>
              <RecordBtn
                onClick={() => {
                  startOrStop()
                  stopRecording()
                  pauseRecording()
                  changePracticeStart()
                }}
                onMouseEnter={() =>
                  setPracticeEnd(true)}
                src="/src/assets/Training/stopbtn.png">
              </RecordBtn>
              <Waves />
            </NowRecording>) :
            (<RecordBtn
              onClick={() => {
                if (stop >= script.durationInSec * 10) {
                  alert("녹음을 완료/취소 해주세요")
                  return
                }
                startOrStop()
                resumeRecording()
                changePracticeEnd()
              }}
              onMouseEnter={() =>
                setPracticeStart(true)}
              src="/src/assets/Training/restartbtn.png"></RecordBtn>)}

        {!initialBtn && !isRunning ?
          <CompleteBtn
            onClick={() => {
              setStop(0)
              stopRecording()
              changePracticeReset()
              addRecord(mediaBlobUrl)
              resetTimer()
            }}>완료</CompleteBtn> : ""}
      </SectionBtn>
      {recordBtnClickable ? <></> : <PreventClickDiv>잠시만 기다려 주세요</PreventClickDiv>}

    </RecordBox>
  )
}
export default RecordButton


// 연습 시작 버튼, 연습 종료 버튼 토글 되는버전

// return(
//   <RecordBox>
//     <StopWatch>{formatTime(time)}</StopWatch>
//     <PracticeStart $practiceStart={practiceStart}>연습 시작</PracticeStart>
//     <PracticeEnd $practiceEnd={practiceEnd}>연습 종료</PracticeEnd>
//     <SectionBtn>
//     { !initialBtn && !isRunning ?
//       <RestartBtn
//         onClick={() => {
//           resetTimer()
//           stopRecording()
//           changePracticeReset()
//           clearBlobUrl()}}>취소</RestartBtn> : ""}

//       { initialBtn ?
//         (<RecordBtn
//           onClick={() => {
//             startOrStop()
//             startRecording()
//             changePracticeEnd()}}
//           onMouseEnter={() =>
//             setPracticeStart(true)}
//           onMouseLeave={() => {
//             setPracticeStart(false)
//             setPracticeEnd(false)}}
//           src="/src/assets/Training/startbtn.png"></RecordBtn>) :
//         isRunning ?
//           (<NowRecording>
//             <RecordBtn
//               onClick={() => {
//                 startOrStop()
//                 stopRecording()
//                 pauseRecording()
//                 changePracticeStart()}}
//               onMouseEnter={() =>
//                 setPracticeEnd(true)}
//               onMouseLeave={() => {
//                 setPracticeStart(false)
//                 setPracticeEnd(false)}}
//               src="/src/assets/Training/stopbtn.png">
//               </RecordBtn>
//               <Waves/>
//             </NowRecording>) :
//           (<RecordBtn
//             onClick={() => {
//               startOrStop()
//               resumeRecording()
//               changePracticeEnd()}}
//             onMouseEnter={() =>
//               setPracticeStart(true)}
//             onMouseLeave={() => {
//               setPracticeStart(false)
//               setPracticeEnd(false)}}
//             src="/src/assets/Training/restartbtn.png"></RecordBtn>)}

//       { !initialBtn && !isRunning ?
//       <CompleteBtn
//           onClick={() => {
//               stopRecording()
//               changePracticeReset()
//               addRecord(mediaBlobUrl)
//               resetTimer()
//             }}>완료</CompleteBtn> : "" }
//     </SectionBtn>
//   </RecordBox>
// )