import { Line } from '../../../type/type';
import { useState, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil';
import { Link, animateScroll as scroll } from 'react-scroll';
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
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number|null>(null);
  const ScrollRef = useRef<number>(0)

  const fixTopScript = () => {
    // 1은 PlayingState
    if(playChange[0] === 1) { 
      setTime(playChange[1] * 1);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // 2은 PausedState
    else if(playChange[0] === 2){ 
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {

    const position = document.getElementById(`${time}`)?.getBoundingClientRect()
    console.log(position)

    
    // if (position) {
    //   ScrollRef.current.scrollTop = position;
    // }
    console.log("너니?",time);
  }, [time]);

  useEffect(()=> {
    fixTopScript()
  },[playChange])

  return(
    <Container>
      <div style={{color:'white'}}>{time}</div>
      <ScriptBox 
        ref={ScrollRef}>
        {lines.map((line,index) => (
          <Scripts
            id={line.startSec}
            key={index}
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