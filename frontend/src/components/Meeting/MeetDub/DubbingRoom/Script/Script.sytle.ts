import { styled } from 'styled-components';

export const Container =styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: flex-end;
  height: 230px;
  width: 570px;
`
export const ScriptBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 22px 22px 22px;
  height: 180px;
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
// export const Scripts = styled.div<{$IsClick:boolean}>`
export const Scripts = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 20px 0px;
  font-weight: 200;
  font-size: 15px;
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
  const minutes = Math.floor(durationInSec / 600)
  const second = Math.floor(durationInSec / 10 % 60)
  return `${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}