import { Line } from '../../../type/type';
import { useState, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil';
import { timeState } from '/src/recoil/HW_Atom';
import { 
  PlayChangebState, 
  ScriptSelectState } from '../../../recoil/Training';
import { 
  Container, 
  Role, 
  ScriptBox,
  Scripts,
  Sentence,
  Time,
  formatTime} from './Script.sytle';

interface VideoProps {
  lines : Line[]
}

function Script ({lines}: VideoProps) {
  const [isScriptSelect,setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const intervalRef = useRef<number|undefined>(undefined);
  const [time, setTime] = useRecoilState(timeState);
  const ScrollRef = useRef<number>(0)

  const fixTopScript = () => {
    // 1은 PlayingState
    if(playChange[0] === 1) { 
      setTime(playChange[1] * 1);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
    }

    // 2은 PausedState
    else if(playChange[0] === 2){ 
      clearInterval(intervalRef.current)
    }
  }
  
  const scriptScrollAction = () => {
    const ScrollStartValue = document.getElementById(`ScriptBox`)?.getBoundingClientRect().y
    const ScriptPosition = document.getElementById(`${String(time)}`)?.getBoundingClientRect().y
    if (ScriptPosition) {
      ScrollRef.current.scrollTop += ScriptPosition-ScrollStartValue-12;
    }
  }

  useEffect(() => {
    scriptScrollAction()
  }, [time]);

  useEffect(()=> {
    fixTopScript()
  },[playChange])

  return(
    <Container>
      <ScriptBox
        id="ScriptBox"
        ref={ScrollRef}>
        {lines.map((line,index) => (
          <Scripts
            key={index}
            id={String(line.startSec)}
            $IsClick={isScriptSelect[index]}>
            <Role>{line.name}</Role>
            <Sentence>{line.content}</Sentence>
            <Time>{formatTime(line.startSec)}</Time>
          </Scripts>
        ))}
      </ScriptBox>
    </Container>
  )
}
export default Script