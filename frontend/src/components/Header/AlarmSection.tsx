import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckAllAlarm, CheckDetailAlarm, recevieAlarm } from "/src/api/alarm";
import { AlarmInfoListType, AlarmType } from "/src/type/hw_type";
import { getPost } from "/src/api/FreeBoard";
import { PostType } from "/src/type/FreeBoard";
import {
  Triangle,
  AlarmListBox,
  AlarmHeader,
  AlarmWord,
  AlarmExitBtn,
  Container,
  AlarmItem,
  AlarmTime,
  AlarmList,
  AlarmListItem,
  AlarmBox,
  AlarmCount,
  AlarmEraseBtn,
  EraseText,
} from "./AlarmSection.style";
import { alarmInfoState } from "/src/recoil/HW_Atom";
import { useRecoilState } from "recoil";
import { CurrentUserAtom } from "/src/recoil/Auth";

interface Headertype {
  AlarmIsShown : boolean,
  setAlarmIsshown : Dispatch<SetStateAction<boolean>>,
}

function AlarmSection({ AlarmIsShown, setAlarmIsshown }: Headertype) {
  const AlarmToggle = () => {setAlarmIsshown((IsShown) => !IsShown)}
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom)
  const [alarmInfo, setAlarmInfo] = useState<AlarmInfoListType[]>([])
  const [test, setTest] = useState()
  const navigate = useNavigate()
  // const [alarmInfo, setAlarmInfo] = useRecoilState<AlarmInfoListType[]>(alarmInfoState)

  const WriteAlarmContent = (alarmList:AlarmType[]) => {
    const alarmInfoTmp: AlarmInfoListType[] = []

    alarmList?.map((alarm, index) => {
      const contentId = alarm.contentId
      const notiId = alarm.id
      const senderNickname = alarm.senderNickname
      const type = alarm.type

      if (type === "FOLLOW") {
        const content = `${senderNickname}님이 회원님을 팔로우 했습니다.`
        alarmInfoTmp.push([content,notiId,type,contentId])
      }

      else if (type === "POST_LIKE") {
        const content = `${senderNickname}님이 내 게시글을 좋아합니다.`
        alarmInfoTmp.push([content,notiId,type,contentId])
      }

      else if (type=== "COMMENT") {
        const content = `${senderNickname}님이 내 게시글에 댓글을 달았습니다.`
        alarmInfoTmp.push([content,notiId,type,contentId])
      }
      // 녹게 완성되면 바로 작업
      else if (type === "RECORD_LIKE") {
        const content = `${senderNickname}님이`
      }
    })
    setAlarmInfo(alarmInfoTmp)
  }
  
  // 전체 알람 확인
  const AllAlarmChecking = () => {
    axiosCheckAllAlarm().then().catch(error=>console.log(error))
    setAlarmInfo([])
  }

  // 상세 알람 확인
  const DetailAlarmChecking = async (alarm:[string, number, string, number],a_idx:number):void => {
    const [content, notiId ,type, contendId] = alarm
    
    const alarmInfoTmp = await alarmInfo.filter((alarm,index) => index !== a_idx)
    await setAlarmInfo(alarmInfoTmp)
    await axiosCheckDetailAlarm(notiId).then().catch(error=>console.log(error))

    if (type === "POST_LIKE" || type === "COMMENT"){
      navigate(`/freeboard/${contendId}`)
    }

    else if (type === "FOLLOW"){
    navigate(`/profile/${currentUser.userid}`)
    }
  }

  // 모든 알람 가져오기 axios
  const axiosReceiveAlarm = async ():Promise<void> => {
    try {
      const data: AlarmType[] | undefined = await recevieAlarm()
      WriteAlarmContent(data)
    }
    catch (error) {
      console.log("ReceiveAlarm",error)
    }
  }

  // 알람 전부 확인 axios
  const axiosCheckAllAlarm = async ():Promise<void> => {
    try { await CheckAllAlarm() }
    catch (error) {
      console.log("ReceiveAlarm",error)
    }
  }

  // 알람 하나 확인 axios
  const axiosCheckDetailAlarm = async (notiId:number):Promise<void> => {
    try { await CheckDetailAlarm(notiId) }
    catch (error) {
      console.log("ReceiveAlarm",error)
    }
  }
  
  useEffect(() => {
    void axiosReceiveAlarm()
  },[])

  return(
    <Container >
      {alarmInfo.length !==0 && <AlarmCount>{alarmInfo.length}</AlarmCount>}
      <AlarmListBox $IsClick={AlarmIsShown}>
        <Triangle/>
        <AlarmHeader>
          <AlarmWord><b>알림</b></AlarmWord>
          <AlarmEraseBtn onClick={AllAlarmChecking}><EraseText><p><b>지우기</b></p></EraseText></AlarmEraseBtn>
          <AlarmExitBtn 
            onClick={AlarmToggle} 
            src="/src/assets/Header/exit_btn.png" ></AlarmExitBtn>
        </AlarmHeader>

        <AlarmBox>
          <AlarmList>
            {alarmInfo && alarmInfo.map((alarm ,a_idx) => (
              <AlarmListItem 
                key={a_idx}
                onClick={
                  () => DetailAlarmChecking(alarm,a_idx)}>
                <AlarmItem>{alarm[0]}</AlarmItem>
                <AlarmTime>3분전</AlarmTime>
              </AlarmListItem>
            ))}
          </AlarmList>
        </AlarmBox>
      </AlarmListBox>
    </Container>
  )
}
export default AlarmSection