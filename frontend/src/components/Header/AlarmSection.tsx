import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AlarmListItem from "./AlarmListItem";
import {
  Triangle,
  AlarmListBox,
  AlarmHeader,
  AlarmWord,
  AlarmExitBtn,
  Container,
} from "./AlarmSection.style";
import { recevieAlarm } from "/src/api/alarm";
import { AlarmType } from "/src/type/hw_type";

interface Headertype {
  AlarmIsShown : boolean,
  setAlarmIsshown : Dispatch<SetStateAction<boolean>>,
}

function AlarmSection({ AlarmIsShown, setAlarmIsshown }: Headertype) {
  const AlarmToggle = () => {setAlarmIsshown((IsShown) => !IsShown)}
  const [alarmList, setAlarmList] = useState<AlarmType[] | undefined>([])
  
  const axiosReceiveAlarm = async ():Promise<void> => {
    try {
      const data: AlarmType[]|undefined = await recevieAlarm()
      setAlarmList(data)
      console.log(data)
    }
    catch (error) {
      console.log("ReceiveAlarm",error)
    }
  }

  useEffect(() => {
    void axiosReceiveAlarm() 
  },[])
  
  return(
    <Container $IsClick={AlarmIsShown}>
      <Triangle/>
      <AlarmListBox>
        <AlarmHeader>
          <AlarmWord><b>알림</b></AlarmWord>
          <AlarmExitBtn onClick={AlarmToggle} src="/src/assets/Header/exit_btn.png" ></AlarmExitBtn>
        </AlarmHeader>

        {/* 알림 데이터 리스트를 map으로 하나 씩 AlarmListItem으로 전달 */}
        <AlarmListItem/>
      </AlarmListBox>
    </Container>
  )
}
export default AlarmSection