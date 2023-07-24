import { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import AlarmListItem from "./AlarmListItem";

const Triangle = styled.div`
  position: fixed;
  top: 33px;
  right: 99px;
  border-bottom: 18px solid white;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  z-index  : 1;
`

const AlarmListBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: white;
  border-radius: 5px;
  top: 42px;
  right: 75px;
  height: 280px;
  width: 230px;
`

const AlarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  height: 27px;
`

const AlarmWord = styled.p`
  font-size: 11px;
  margin-left: 10px;
`

const AlarmExitBtn = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 5px;
  cursor: pointer;
`

interface Headertype {
  setAlarmIsshown : Dispatch<SetStateAction<boolean>>,
}

function AlarmSection({ setAlarmIsshown }: Headertype) {
  const AlarmToggle = () => {setAlarmIsshown((IsShown) => !IsShown)}

  return(
    <div>
      <Triangle/>
      <AlarmListBox>
        <AlarmHeader>
          <AlarmWord><b>알림</b></AlarmWord>
          <AlarmExitBtn onClick={AlarmToggle} src="/src/assets/Header/exit_btn.png" ></AlarmExitBtn>
        </AlarmHeader>

        {/* 알림 데이터 리스트를 map으로 하나 씩 AlarmListItem으로 전달 */}
        <AlarmListItem/>
      </AlarmListBox>
    </div>
  )
}
export default AlarmSection