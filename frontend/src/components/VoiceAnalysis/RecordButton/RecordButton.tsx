import { useRef, useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import { useRecoilState } from 'recoil';
import { analysisRecordState } from '../../../recoil/hw_atom';
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
  const [analysisRecord, setanalysisRecord] = useRecoilState(analysisRecordState)

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

  const addRecording = (file) => {
    setanalysisRecord([file, ...analysisRecord])
    console.log(analysisRecord)
  }

  return(
    <RecordBox>
      <div id="waveform"></div>
      <StopWatch>{formatTime(time)}</StopWatch>
        <ReactMediaRecorder
          audio
          render={({
            startRecording, 
            pauseRecording, 
            resumeRecording, 
            stopRecording,
            clearBlobUrl, 
            mediaBlobUrl }) => (
          <SectionBtn>
            <RestartBtn
              onClick={() => {
                resetTimer()
                stopRecording()}}>취소</RestartBtn>
            { initialBtn ? 
              (<RecordBtn
                onClick={() => {
                  startOrStop()
                  startRecording()}}
                src="/src/assets/Training/startbtn.png"></RecordBtn>) :
              isRunning ? 
                (<RecordBtn
                  onClick={() => {
                    startOrStop()
                    pauseRecording()}}
                  src="/src/assets/Training/stopbtn.png"></RecordBtn>) :
                (<RecordBtn
                  onClick={() => {
                    startOrStop()
                    resumeRecording()}}
                  src="/src/assets/Training/restartbtn.png"></RecordBtn>)
            }
            <CompleteBtn
                onClick={() => {
                  resetTimer()
                  stopRecording()
                  addRecording(mediaBlobUrl)}}>완료</CompleteBtn>
          </SectionBtn>
          )}
        />
    </RecordBox>
  )
}
export default RecordButton