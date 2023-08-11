import { styled } from 'styled-components';

export const Container =styled.div`
`

export const ScriptBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px;
  height: 160px;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.15);

  &::-webkit-scrollbar {
    width: 8px;
    margin-right: 20px;
  }

  &::-webkit-scrollbar-thumb {
    height: 20px; /* 스크롤바의 길이 */
    background: #535353; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  /* &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상
  }
   */
`

export const Scripts = styled.div<{$IsClick:boolean}>`
  display: flex;
  margin: 0px 0px 12px 0px;
  justify-content: space-between;
  font-weight: ${props => props.$IsClick ? '800' : '100'};
  font-size: ${props => props.$IsClick ? '17px' : '15px'};
`

export const Script_Unit = styled.p`
  text-align: left;
  color: white;
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