import { useState, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil';
import { Line } from '/src/type/type';
import { MeetDubPlayChangebState } from '/src/recoil/HW_Atom';
import { 
  PlayChangebState, 
  ScriptSelectState } from '/src/recoil/Training';
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
  const [isScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  // const [playChange] = useRecoilState<number[]>(PlayChangebState)
  const [meetDubPlayChange] = useRecoilState<number[]>(MeetDubPlayChangebState)
  const intervalRef = useRef<number|undefined>(undefined);
  const [time, setTime] = useState(0);
  const ScrollRef = useRef<number>(0)

  const fixTopScript = () => {
    // 1은 PlayingState
    if(meetDubPlayChange[0] === 1) { 
      setTime(meetDubPlayChange[1] * 1);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
    }

    // 2은 PausedState
    else if(meetDubPlayChange[0] === 2){ 
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    const ScrollStartValue = document.getElementById(`ScriptBox`)?.getBoundingClientRect().y
    const ScriptPosition = document.getElementById(`${String(time)}`)?.getBoundingClientRect().y
    // console.log(time,ScriptPosition)

    if (ScriptPosition) {
      ScrollRef.current.scrollTop += ScriptPosition-ScrollStartValue-12;
    }
  }, [time]);

  useEffect(()=> {
    fixTopScript()
  },[meetDubPlayChange])

  return(
    <Container>
      {/* <div style={{color:'white'}}>{time}</div> */}
      <ScriptBox 
        id="ScriptBox"
        ref={ScrollRef}>
        {lines.map((line,index) => (
          <Scripts
            key={index}
            id={String(line.startSec)}
            // $IsClick={isScriptSelect[index]}
            >
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