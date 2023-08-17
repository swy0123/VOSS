import { useRef, useState, useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useReactMediaRecorder } from "react-media-recorder";
import { accentRecordState } from "../../../recoil/Training";
import {
  accentClickableState,
  accentScriptState,
  accentSttState,
  initialBtnState,
} from "/src/recoil/HW_Atom";
import SoundToText from "../AccentResult/SoundToText";
import {
  Backdrop,
  CompleteBtn,
  NowRecording,
  PracticeEnd,
  PracticeStart,
  RecordBox,
  RecordBtn,
  RestartBtn,
  SectionBtn,
  StopWatch,
  Waves,
} from "./RecordButton.style";
import ConfirmContext from "/src/context/confirm/ConfirmContext";
import AlertContext from "/src/context/alert/AlertContext";

function RecordButton() {
  const [accentRecord, setAccentRecord] = useRecoilState(accentRecordState);
  const [accentScript, setAccentScript] = useRecoilState(accentScriptState);
  const [accentClickable, setaccentClickable] = useRecoilState<boolean>(accentClickableState);
  const [accentText, setAccentText] = useRecoilState(accentSttState);
  const [practiceStart, setPracticeStart] = useState(false);
  const [practiceEnd, setPracticeEnd] = useState(false);
  const [initialBtn, setInitialBtn] = useRecoilState(initialBtnState);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const stopRef = useRef<number | null>(null);
  const [stop, setStop] = useState(0);
  const { alert: alertComp } = useContext(AlertContext);
  const {
    startRecording,
    stopRecording,
    clearBlobUrl,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  const { confirm: confirmComp } = useContext(ConfirmContext);
  const onConfirmClick = async (text: string) => {
    const result = await confirmComp(text);
    console.log("custom", result);
    return result;
  };

  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  // 녹음 시간 20초 제한
  useEffect(() => {
    if (stop === 200) {
      startOrStop();
      stopRecording();
      setPracticeStart(false);
      setPracticeEnd(false);
    }
  }, [stop]);

  const startOrStop = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      // 녹음 시간 20초 제한
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
    setAccentText("");
    clearInterval(intervalRef.current);
    setInitialBtn(true);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  const addRecord = (mediaBlobUrl) => {
    setAccentText("");
    setAccentRecord([mediaBlobUrl, ...accentRecord.slice(0, 4)]);
  };

  const changePracticeEnd = () => {
    setPracticeStart(false);
    setPracticeEnd(true);
  };

  const changePracticeStart = () => {
    setPracticeStart(true);
    setPracticeEnd(false);
  };

  const { startListening, stopListening, accenting, hasRecognitionSupport } = SoundToText();

  const openAlert = async () => {
    const nextAction = await onConfirmClick("녹음을 중단하시겠습니까?");
    if (nextAction) {
      startOrStop();
      stopRecording();
      pauseRecording();
      stopListening();
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
    <RecordBox>
      <StopWatch>
        <span>{formatTime(time)}</span>
        <span> / 00 : 20</span>
      </StopWatch>
      <PracticeStart $practiceStart={practiceStart}>연습 시작</PracticeStart>
      <PracticeEnd $practiceEnd={practiceEnd}>연습 종료</PracticeEnd>
      {hasRecognitionSupport ? (
        <SectionBtn $IsRunning={isRunning}>
          {!initialBtn && !isRunning ? (
            <RestartBtn
              src="/src/assets/Training/Cancel.png"
              onClick={() => {
                resetTimer();
                stopRecording();
                clearBlobUrl();
                stopListening();
              }}
            />
          ) : (
            ""
          )}

          {initialBtn ? (
            <RecordBtn
              onClick={() => {
                if (!accentScript) {
                  onAlertClick("스크립트를 생성해주세요.");
                  return;
                }
                setStop(0);
                startOrStop();
                startRecording();
                startListening();
                changePracticeEnd();
              }}
              onMouseEnter={() => setPracticeStart(true)}
              onMouseLeave={() => {
                setPracticeStart(false);
                setPracticeEnd(false);
              }}
              src="/src/assets/Training/startbtn.png"
            ></RecordBtn>
          ) : isRunning ? (
            <NowRecording>
              <RecordBtn
                onClick={() => {
                  startOrStop();
                  stopRecording();
                  pauseRecording();
                  accenting();
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
                if (!accentClickable) {
                  onAlertClick("발음을 분석중이니 잠시만 기다려주세요");
                  return;
                }
                if (stop >= 200) {
                  openConfirm()
                  return;
                }
                startOrStop();
                startListening();
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
                addRecord(mediaBlobUrl);
                resetTimer();
                stopListening();
              }}
            />
          ) : (
            ""
          )}
        </SectionBtn>
      ) : (
        <h1> Your browser has no speech recognition support</h1>
      )}

      {isRunning ? (
        <Backdrop
          onClick={(e) => {
            // e.stopPropagation();
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
