import { styled } from 'styled-components';
import { Line } from '../../type/type';

const ScriptBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  padding: 30px;
  height: 160px;
  /* overflow-y: scroll; */
`
const Scripts = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 12px 0px;
`
const Script_Unit = styled.p`
  color: white;
  font-size: 12px;
  text-align: left;
  margin: 0px;
`
const Role = styled(Script_Unit)``
const Sentence = styled(Script_Unit)`
  text-align: left;
  width: 250px;
`
const Time = styled(Script_Unit)``

interface VideoProps {
  lines : Line[]
}

function Script ({lines}: VideoProps) {
  const formatTime = (durationInSec: number) => {
    const minutes = Math.floor(durationInSec / 60)
    const second = Math.floor(durationInSec % 60)
    return `${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
  }
  
  return(
    <ScriptBox>
      {lines.map((line,index) => (
        <Scripts key={index}>
          <Role>{line.name}</Role>
          <Sentence>{line.content}</Sentence>
          <Time>{formatTime(line.startSec)}</Time>
        </Scripts>
      ))}
    </ScriptBox>
  )
}
export default Script