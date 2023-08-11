import { Dispatch, SetStateAction } from "react";
import AlarmListItem from "./AlarmListItem";
import {
  Triangle,
  AlarmListBox,
  AlarmHeader,
  AlarmWord,
  AlarmExitBtn,
} from "./AlarmSection.style";



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