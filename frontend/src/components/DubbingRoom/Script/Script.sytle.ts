import { styled } from 'styled-components';

export const Container =styled.div`
`
export const ScriptBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 30px;
  height: 150px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
export const Scripts = styled.div<{$IsClick:boolean}>`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 12px 0px;
  font-weight: ${props => props.$IsClick ? '800' : '100'};

`
export const Script_Unit = styled.p`
  color: white;
  font-size: 20px;
  text-align: left;
  margin: 0px;
`
export const Role = styled(Script_Unit)``
export const Sentence = styled(Script_Unit)`
  text-align: left;
  width: 250px;
`
export const Time = styled(Script_Unit)``

export const formatTime = (durationInSec: number) => {
  const minutes = Math.floor(durationInSec / 60)
  const second = Math.floor(durationInSec % 60)
  return `${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}