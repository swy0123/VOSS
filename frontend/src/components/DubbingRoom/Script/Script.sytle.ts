import { styled } from 'styled-components';

export const Container =styled.div`
`
export const RoleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 33px;
  margin-bottom: 10px;
`
export const OptionButton = styled.button`
  background-color: transparent;
  border: 1px solid #6C6C6C;
  border-radius: 14px;
  color:#6C6C6C;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  padding: 0px 7px 0px 7px;
  margin-left: 6px;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
export const RoleButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#6C6C6C"};
  border: solid ${props => props.$IsClick ? "2px white" : "1px #6C6C6C"};
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