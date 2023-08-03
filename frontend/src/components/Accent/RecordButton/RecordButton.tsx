import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useReactMediaRecorder } from 'react-media-recorder';
import { accentRecordState } from '../../../recoil/Training';
import SoundToText from '../AccentResult/SoundToText';
import { 
  CompleteBtn, 
  RecordBox, 
  RecordBtn, 
  RestartBtn, 
  SectionBtn, 
  StopWatch } from './RecordButton.style';

function RecordButton () {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number|null>(null);
  const [initialBtn, setInitialBtn] = useState(true)
  const [accentRecord, setAccentRecord] = useRecoilState(accentRecordState)
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

  const addRecord = (mediaBlobUrl) => {
    setAccentRecord([mediaBlobUrl,...accentRecord.slice(0,4)])
  }

  const {
    startListening,
    stopListening,
    hasRecognitionSupport
  } = SoundToText()

  return(
    <RecordBox>
      <StopWatch>{formatTime(time)}</StopWatch>
          {hasRecognitionSupport ? (
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
                  startListening()}}
                src="/src/assets/Training/startbtn.png"></RecordBtn>) :
              isRunning ? 
                (<RecordBtn
                  onClick={() => {
                    startOrStop()
                    stopRecording()
                    pauseRecording()
                    stopListening()
                  }}
                  src="/src/assets/Training/stopbtn.png"></RecordBtn>) :
                (<RecordBtn
                  onClick={() => {
                    startOrStop()
                    resumeRecording()
                    startListening()}}
                  src="/src/assets/Training/restartbtn.png"></RecordBtn>)}

            { !initialBtn && !isRunning ?
            <CompleteBtn
                onClick={() => {
                    stopRecording()
                    addRecord(mediaBlobUrl)
                    resetTimer()
                  }}>완료</CompleteBtn> : "" }
          </SectionBtn>
          ) : (
            <h1> Your browser has no speech recognition support</h1>
          )}
    </RecordBox>
  )
}
export default RecordButton