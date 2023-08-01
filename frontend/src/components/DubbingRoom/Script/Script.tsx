import { Line } from '../../../type/type';
import { useState, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil';
import { 
  PlayChangebState, 
  RoleSelectState, 
  ScriptSelectState } from '../../../recoil/Training';
import { 
  Container, 
  Role, 
  RoleBox, 
  RoleButton,
  ScriptBox,
  Scripts,
  Sentence,
  Time,
  formatTime} from './Script.sytle';

interface VideoProps {
  roles : string[]
  lines : Line[]
}

function Script ({lines,roles}: VideoProps) {
  const [isRoleSelect,setIsRoleSelect] = useRecoilState<boolean[]>(RoleSelectState)
  const [isScriptSelect,setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number|null>(null);
  
  const handleRoleBtn = async (index:number) => {
    const newRoleSelect = await Array(roles.length).fill(false)
    newRoleSelect[index] = await !isRoleSelect[index]
    await setIsRoleSelect(newRoleSelect)

    if (newRoleSelect[index] === true){
      const newScriptSelect = await lines.map((line) => line.name===roles[index])
      await setIsScriptSelect(newScriptSelect)
      }
  }
  const fixTopScript = () => {
    // 1은 PlayingState
    if(playChange[0] === 1) { 
      setTime(playChange[1] * 1000);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    // 2은 PausedState
    else if(playChange[0] === 2){ 
      clearInterval(intervalRef.current)
    }
  }

  useEffect(()=> {
    fixTopScript()
  },[playChange])

  return(
    <Container>
      <RoleBox>
          {roles.map((role,index) => (
            <RoleButton 
              key={index}
              $IsClick={isRoleSelect[index]}
              onClick={()=>handleRoleBtn(index)}
              > {role}
            </RoleButton>
          ))}
        <div style={{color:'white'}}>{time}</div>
      </RoleBox>

      <ScriptBox>
        {lines.map((line,index) => (
          <Scripts
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