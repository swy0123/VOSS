import { useRef, useState } from 'react';
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
    if (!isRunning) {
      setInitialBtn(true)
      setTime(0);
    }
  };
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return(
    <RecordBox>
      <StopWatch>{formatTime(time)}</StopWatch>
      <SectionBtn>
        <RestartBtn
          onClick={resetTimer}>취소</RestartBtn>
        { initialBtn ? 
          (<RecordBtn
            onClick={startOrStop}
            src="/src/assets/Training/startbtn.png"></RecordBtn>) :
          isRunning ? 
            (<RecordBtn
              onClick={startOrStop}
              src="/src/assets/Training/stopbtn.png"></RecordBtn>) :
            (<RecordBtn
              onClick={startOrStop}
              src="/src/assets/Training/restartbtn.png"></RecordBtn>)
        }
        <CompleteBtn
          onClick={resetTimer}>완료</CompleteBtn>
      </SectionBtn>
    </RecordBox>
  )
}
export default RecordButton