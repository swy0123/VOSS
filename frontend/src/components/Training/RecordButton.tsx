import { useRef, useState } from 'react';
import { styled } from 'styled-components';

const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px dashed #efefef;
  margin-top: 40px;
  height: 170px;
  width: 350px;
`
const StopWatch = styled.p`
  color: white;
  margin: 30px 0px 20px 0px;
`
const SectionBtn = styled.div`
  display: flex;
  align-items: center;
`
const Button = styled.button`
  background-color: #3a3a3a;
  border-radius: 16px;
  border: none;
  color: white;
  font-size: 16px;
  height: 30px;
  width: 50px;
  cursor: pointer;
`
const RestartBtn = styled(Button)``
const CompleteBtn = styled(Button)``

const RecordBtn = styled.img`
  width: 100px;
  cursor: pointer;
`

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
          onClick={resetTimer}>취소
        </RestartBtn>
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
        <CompleteBtn>완료</CompleteBtn>
      </SectionBtn>
    </RecordBox>
  )
}
export default RecordButton