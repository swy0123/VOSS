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
  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (AlarmIsShown && node.current && !node.current.contains(e.target)) {
        setAlarmIsshown(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [AlarmIsShown]);

  const WriteAlarmContent = (alarmList:AlarmType[]) => {
    const alarmInfoTmp: AlarmInfoListType[] = []

    alarmList?.map((alarm, index) => {
      const contentId = alarm.contentId
      const notiId = alarm.id
      const senderNickname = alarm.senderNickname
      const type = alarm.type
      const createdAt = alarm.createdAt

      if (type === "FOLLOW") {
        const content = `${senderNickname}님이 회원님을 팔로우 했습니다.`
        alarmInfoTmp.unshift([content,notiId,type,contentId,createdAt])
      }

      else if (type === "POST_LIKE") {
        const content = `${senderNickname}님이 내 게시글을 좋아합니다.`
        alarmInfoTmp.unshift([content,notiId,type,contentId,createdAt])
      }

      else if (type=== "COMMENT") {
        const content = `${senderNickname}님이 내 게시글에 댓글을 달았습니다.`
        alarmInfoTmp.unshift([content,notiId,type,contentId,createdAt])
      }
      // 녹게 완성되면 바로 작업
      else if (type === "RECORD_LIKE") {
        const content = `${senderNickname}님이 내 녹음게시물을 좋아합니다.`
        alarmInfoTmp.unshift([content,notiId,type,contentId,createdAt])
      }
    })
    setAlarmInfo(alarmInfoTmp)
  }
  
  // 전체 알람 확인
  const AllAlarmChecking = () => {
    axiosCheckAllAlarm().then().catch(error=>console.log(error))
    setAlarmIsshown(false)
    setAlarmInfo([])
  }

  // 상세 알람 확인
  const DetailAlarmChecking = async (alarm:[string, number, string, number, string],a_idx:number):void => {
    const [content, notiId ,type, contendId, createdAt] = alarm
    
    const alarmInfoTmp = await alarmInfo.filter((alarm,index) => index !== a_idx)
    await setAlarmInfo(alarmInfoTmp)
    await axiosCheckDetailAlarm(notiId).then().catch(error=>console.log(error))

    if (type === "POST_LIKE" || type === "COMMENT"){
      navigate(`/freeboard/${contendId}`)
    }

    else if (type === "RECORD_LIKE"){
    navigate(`/recordboard`)
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

  const timeAgo = (datetime: string) => {
    const currentTime = new Date();
    const alarmDate = new Date(datetime);

    const timeDifference = currentTime.getTime() - alarmDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${weeks}주전`;
    } else if (days > 0) {
      return `${days}일전`;
    } else if (hours > 0) {
      return `${hours}시간전`;
    } else if (minutes > 0) {
      return `${minutes}분전`;
    } else {
      return `${seconds}초전`;
    }
  };

  return(
    <Container ref={node}>
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
                <AlarmTime>{timeAgo(alarm[4])}</AlarmTime>
              </AlarmListItem>
            ))}
          </AlarmList>
        </AlarmBox>
      </AlarmListBox>
    </Container>
  )
}
export default AlarmSection