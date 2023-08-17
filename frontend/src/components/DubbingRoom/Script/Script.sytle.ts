import { styled } from 'styled-components';

export const Container =styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: flex-end;
  height: 204px;
  width: 470px;
`

export const ScriptBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 22px 22px 22px;
  height: 165px;
  width: 417px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    margin-right: 20px;
  }

  &::-webkit-scrollbar-thumb {
    height: 20px; /* 스크롤바의 길이 */
    border-radius: 9px;
    background: #181818;
    border: 1px solid #515151;
  }
`

export const Scripts = styled.div<{$IsClick:boolean}>`
  display: flex;
  margin: 0px 0px 12px 0px;
  justify-content: space-between;
  font-weight: ${props => props.$IsClick ? '800' : '100'};
  font-size: ${props => props.$IsClick ? '17px' : '15px'};
  color: ${props => props.$IsClick ? 'white' : 'gray'};
`

export const Script_Unit = styled.p`
  text-align: left;
  /* color: white; */
  margin: 0px;
`

export const Role = styled(Script_Unit)`
  width: 70px;
  
`

export const Sentence = styled(Script_Unit)`
  text-align: left;
  width: 270px;
`

export const Time = styled(Script_Unit)`
  width: 40px;
`

export const formatTime = (durationInSec: number) => {
  const minutes = Math.floor(durationInSec / 600)
  const second = Math.floor(durationInSec / 10 % 60)
  return `${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}