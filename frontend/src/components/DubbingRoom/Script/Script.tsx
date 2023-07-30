import { Line } from '../../../type/type';
import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { RoleSelectState } from '../../../recoil/hw_atom';
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
  const [isScriptSelect,setIsScriptSelect] = useState<boolean[]>([])

  const handleRoleBtn = async (index:number) => {
    const newRoleSelect = await Array(roles.length).fill(false)
    newRoleSelect[index] = await !isRoleSelect[index]
    await setIsRoleSelect(newRoleSelect)

    if (newRoleSelect[index] === true){
      const newScriptSelect = await lines.map((line) => line.name===roles[index])
      await setIsScriptSelect(newScriptSelect)
      console.log(isScriptSelect)
      }
  }

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