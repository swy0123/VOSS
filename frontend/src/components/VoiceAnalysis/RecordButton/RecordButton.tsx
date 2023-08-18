import { useEffect, useRef, useState, useContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useRecoilState } from "recoil";
import { analysisRecordState, AgeSelectedState, GenderSelectedState,  AgeRecordedState, GenderRecordedState } from "../../../recoil/Training";
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
  const [analysisRecord, setAnalysisRecord] = useRecoilState(analysisRecordState);
  const [practiceStart, setPracticeStart] = useState(false);
  const [practiceEnd, setPracticeEnd] = useState(false);
  const [initialBtn, setInitialBtn] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const stopRef = useRef<number | null>(null);
  const [stop, setStop] = useState(0);
  const { alert: alertComp } = useContext(AlertContext);
  const [genderSelected, setGenderSelected] = useRecoilState(GenderSelectedState);
  const [ageSelected, setAgeSelected] = useRecoilState(AgeSelectedState);
  const [genderRecorded, setGenderRecorded] = useRecoilState(GenderRecordedState);
  const [ageRecorded, setAgeRecorded] = useRecoilState(AgeRecordedState);

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

      // 녹음 시간
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

  const addRecord = (mediaBlobUrl: string) => {
    setAnalysisRecord([[mediaBlobUrl, ageRecorded, genderRecorded] , ...analysisRecord.slice(0, 4)]);
  };

  const changePracticeEnd = () => {
    setPracticeStart(false);
    setPracticeEnd(true);
  };

  const changePracticeStart = () => {
    setPracticeStart(true);
    setPracticeEnd(false);
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

  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  const openAlert = async () => {
    const nextAction = await onConfirmClick("녹음을 중단하시겠습니까?");
    if (nextAction) {
      setTime(0);
      setStop(0)
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
    <RecordBox>
      <StopWatch>
        <span>{formatTime(time)}</span>
        <span> / 00 : 20</span>
      </StopWatch>

      <PracticeStart $practiceStart={practiceStart}>연습 시작</PracticeStart>
      <PracticeEnd $practiceEnd={practiceEnd}>연습 종료</PracticeEnd>
      <SectionBtn $IsRunning={isRunning}>
        {!initialBtn && !isRunning ? (
          <RestartBtn
            src="/src/assets/Training/Cancel.png"
            onClick={() => {
              setStop(0);
              resetTimer();
              stopRecording();
              clearBlobUrl();
            }}
          />
        ) : (
          ""
        )}

        {initialBtn ? (
          <RecordBtn
            onClick={() => {
              startOrStop();
              startRecording();
              setAgeRecorded(ageSelected[0])
              setGenderRecorded(genderSelected[0])
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
              if (stop >= 200) {
                openConfirm();
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
              addRecord(mediaBlobUrl);
              resetTimer();
            }}
          />
        ) : (
          ""
        )}
      </SectionBtn>
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
