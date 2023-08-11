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
    width: 10px;
    margin-right: 10px;
  }

  &::-webkit-scrollbar-thumb {
    height: 20%; /* 스크롤바의 길이 */
    background: #535353; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
`
export const Scripts = styled.div<{$IsClick:boolean}>`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 20px 0px;
  font-weight: ${props => props.$IsClick ? '800' : '100'};
  font-size: ${props => props.$IsClick ? '18px' : '15px'};
`
export const Script_Unit = styled.p`
  text-align: left;
  color: white;
  margin: 0px;
`
export const Role = styled(Script_Unit)`
  width: 70px;
  margin-left: 10px;
`
export const Sentence = styled(Script_Unit)`
  text-align: left;
  width: 350px;
`
export const Time = styled(Script_Unit)`
  margin-left: 30px;
`

export const formatTime = (durationInSec: number) => {
  const minutes = Math.floor(durationInSec / 60)
  const second = Math.floor(durationInSec % 60)
  return `${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}