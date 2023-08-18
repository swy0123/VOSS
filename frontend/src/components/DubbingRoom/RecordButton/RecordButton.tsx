import { useContext, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useReactMediaRecorder } from "react-media-recorder";
import { PlayTriggerState, dubbingRecordState, youtubeState } from "/src/recoil/HW_Atom";
import {
  Backdrop,
  CompleteBtn,
  MoonLoaderDiv,
  NowRecording,
  ParcticeStartSection,
  PracticeEnd,
  PracticeStart,
  PreventClickDiv,
  RecordBox,
  RecordBtn,
  RestartBtn,
  SectionBtn,
  StopWatch,
  Waves,
} from "./RecordButton.style";
import { PlayChangebState, ScriptSelectState } from "/src/recoil/Training";
import axios from "axios";
import { Line, Script } from "/src/type/type";
import { MoonLoader } from "react-spinners";
import ConfirmContext from "/src/context/confirm/ConfirmContext";
import AlertContext from "/src/context/alert/AlertContext";

interface VideoProps {
  script: Script;
  lines: Line[];
}

function RecordButton({ script, lines }: VideoProps) {
  const [dubbingRecord, setdubbingRecord] = useRecoilState(dubbingRecordState);
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState);
  const [playTrigger, setPlayTrigger] = useRecoilState<number>(PlayTriggerState);
  const [isScriptSelect, setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState);
  const [practiceStart, setPracticeStart] = useState(false);
  const [practiceEnd, setPracticeEnd] = useState(false);
  const [initialBtn, setInitialBtn] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const stopRef = useRef<number | null>(null);
  const [stop, setStop] = useState(0);
  const [recordBtnClickable, setRecordBtnClickable] = useState<boolean>(true);
  const [recordActive, setRecordActive] = useState<boolean>(false);
  const { alert: alertComp } = useContext(AlertContext);

  const {
    startRecording,
    stopRecording,
    clearBlobUrl,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    video: false,
    mediaRecorderOptions: {
      mimeType: "audio/webm;codecs=opus",
    },
  });

  const { confirm: confirmComp } = useContext(ConfirmContext);
  const onConfirmClick = async (text: string) => {
    const result = await confirmComp(text);
    console.log("custom", result);
    return result;
  };

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
    } else if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      clearInterval(stopRef.current);
      setIsRunning(false);
    }
    setInitialBtn(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setInitialBtn(true);
    setIsRunning(false);
    setTime(0);
  };

  const formatTimeLeft = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  const formatTimeRight = (durationInSec: number) => {
    const minutes = Math.floor(durationInSec / 60)
    const second = Math.floor(durationInSec % 60)
    return `${minutes.toString().padStart(2, '0')} : ${second.toString().padStart(2, '0')}`
  }

  const getParamStr = () => {
    let param = "";

    for (var i = 0; i < lines.length; i++) {
      if (!isScriptSelect[i]) continue;
      param += "&parts=" + lines[i].startSec + ":" + lines[i].endSec;
    }

    return param;
  };

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
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      };
      const res = await axios.post(url, formData, config);
      const newBlob = new Blob([res.data], { type: "audio/mp3" });
      const audioBlobURL = URL.createObjectURL(newBlob);

      setdubbingRecord([audioBlobURL, ...dubbingRecord.slice(0, 4)]);
    } catch (error) {
      console.error("Error fetching merged audio:", error);
    }
    setRecordBtnClickable(true);
  };

  // 연습 멈춤 -> 재시작
  const changePracticeEnd = () => {
    setPracticeStart(false);
    setPracticeEnd(true);
    setPlayTrigger(1);
  };

  // 연습 진행중 -> 정지
  const changePracticeStart = () => {
    setPracticeStart(true);
    setPracticeEnd(false);
    setPlayTrigger(2);
  };

  // 연습 다시시작 준비
  const changePracticeReset = () => {
    setPlayTrigger(0);
  };

  // 녹음 시간 영상시간 제한
  useEffect(() => {
    if (stop === script.durationInSec * 10) {
      startOrStop();
      stopRecording();
      setPracticeStart(true);
      setPracticeEnd(false);
      setTimeout(() => {
        setPlayTrigger(2);
      }, 2500);
    }
  }, [stop]);

  useEffect(() => {
    setTimeout(() => {
      setRecordActive(true);
    }, 500);
  }, []);

  const openAlert = async () => {
    const nextAction = await onConfirmClick("녹음을 중단하시겠습니까?");
    if (nextAction) {
      startOrStop();
      stopRecording();
      pauseRecording();
      changePracticeStart();
    }
    return;
  };

  const openConfirm = async () => {
    const nextAction = await onConfirmClick("녹음을 중단하시겠습니까?");
    if (nextAction) {
      setStop(0)
      resetTimer()
      stopRecording();
      pauseRecording();
      setPracticeStart(false);
      setPracticeEnd(false);
    }
    return;
  };

  return (
    <RecordBox $recordActive={recordActive}>
      <StopWatch>{`${formatTimeLeft(time)} / ${formatTimeRight(script.durationInSec)}`}</StopWatch>
      <PracticeStart $practiceStart={practiceStart}>연습 시작</PracticeStart>
      <PracticeEnd $practiceEnd={practiceEnd}>연습 종료</PracticeEnd>
      <SectionBtn $IsClickable={recordBtnClickable} $IsRunning={isRunning}>
        {!initialBtn && !isRunning ? (
          <RestartBtn
            src="/src/assets/Training/Cancel.png"
            onClick={() => {
              setStop(0);
              resetTimer();
              stopRecording();
              changePracticeReset();
              clearBlobUrl();
            }}
          />
        ) : (
          ""
        )}

        {initialBtn ? (
          <ParcticeStartSection $IsClickable={recordBtnClickable}>
            <RecordBtn
              onClick={() => {
                startOrStop();
                startRecording();
                changePracticeEnd();
              }}
              onMouseEnter={() => setPracticeStart(true)}
              onMouseLeave={() => {
                setPracticeStart(false);
                setPracticeEnd(false);
              }}
              src="/src/assets/Training/startbtn.png"
            ></RecordBtn>
            {/* <ParcticeInfo>녹음과함께 재생</ParcticeInfo>/ */}
            <MoonLoaderDiv>
              {recordBtnClickable ? <></> : <MoonLoader color="white" size={70} />}
              
            </MoonLoaderDiv>
          </ParcticeStartSection>
        ) : isRunning ? (
          <NowRecording>
            <RecordBtn
              onClick={() => {
                startOrStop();
                stopRecording();
                pauseRecording();
                changePracticeStart();
              }}
              onMouseEnter={() => setPracticeEnd(true)}
              onMouseLeave={() => {
                setPracticeStart(false);
                setPracticeEnd(false);
              }}
              src="/src/assets/Training/stopbtn.png"
            ></RecordBtn>
            <Waves />
          </NowRecording>
        ) : (
          <RecordBtn
            onClick={() => {
              if (stop >= script.durationInSec * 10) {
                openConfirm()
                return;
              }
              startOrStop();
              resumeRecording();
              changePracticeEnd();
            }}
            onMouseEnter={() => setPracticeStart(true)}
            onMouseLeave={() => {
              setPracticeStart(false);
              setPracticeEnd(false);
            }}
            src="/src/assets/Training/restartbtn.png"
          ></RecordBtn>
        )}
        {!initialBtn && !isRunning ? (
          <CompleteBtn
            src="/src/assets/Training/Add.png"
            onClick={() => {
              setStop(0);
              stopRecording();
              changePracticeReset();
              addRecord(mediaBlobUrl);
              resetTimer();
            }}
          />
        ) : (
          ""
        )}
        
      </SectionBtn>
      {recordBtnClickable ? <></> : <PreventClickDiv>잠시만 기다려 주세요</PreventClickDiv>}
      {isRunning ? (
        <Backdrop
          onClick={(e) => {
            e.stopPropagation();
            openAlert();
          }}
        ></Backdrop>
      ) : (
        <></>
      )}
    </RecordBox>
  );
}
export default RecordButton;
