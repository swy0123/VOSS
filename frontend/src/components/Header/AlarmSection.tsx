import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
} from "./AlarmSection.style";
import { CheckAllAlarm, CheckDetailAlarm, recevieAlarm } from "/src/api/alarm";
import { AlarmType } from "/src/type/hw_type";
import { getPost } from "/src/api/FreeBoard";
import { PostType } from "/src/type/FreeBoard";
import { useNavigate } from "react-router-dom";

interface Headertype {
  AlarmIsShown : boolean,
  setAlarmIsshown : Dispatch<SetStateAction<boolean>>,
}

function AlarmSection({ AlarmIsShown, setAlarmIsshown }: Headertype) {
  const AlarmToggle = () => {setAlarmIsshown((IsShown) => !IsShown)}
  const [alarmContent, setAlarmContent] = useState<{ content: string, notiid: number }[]>([])
  const navigate = useNavigate()

  const WriteAlarmContent = (alarmList:AlarmType[]) => {
    const alarmContentTmp:{ content: string, notiId: number, type:string }[] = []
    alarmList?.map((alarm, index) => {
      const notiId = alarm.id
      const senderNickname = alarm.senderNickname
      const contentId = alarm.contentId
      const type = alarm.type

      if (type === "FOLLOW") {
        const content = `${senderNickname}님이 회원님을 팔로우 했습니다.`
        alarmContentTmp.push([content,notiId,type])
      }

      else if (type === "POST_LIKE") {
        getPostTitle(contentId)
          
          .then (data => {
            const content = `${senderNickname}님이 '${data.title}' 게시글을 좋아합니다.`
            alarmContentTmp.push([content,notiId,type,data.id])
          })
          .catch(error => {
            console.log(error)
          })
      }

      else if (type=== "COMMENT") {
        getPostTitle(contentId)
          .then (data => {
            const content = `${senderNickname}님이 '${data.title}' 게시글에 댓글을 달았습니다.`
            alarmContentTmp.push([content,notiId,type, data.id])
          })
          .catch(error => {
            console.log(error)
          })
      }

      // 녹게 완성되면 바로 작업
      else if (type === "RECORD_LIKE") {
        const content = `${senderNickname}님이`
      }
    })
    setAlarmContent(alarmContentTmp)
  }

  const DetailAlarmChecking = (alarmInfo:[string, number, string, number]):void => {
    const [content, notiId ,type, postId] = alarmInfo

    axiosCheckDetailAlarm(notiId).then().catch(error=>console.log(error))

    if (type === "POST_LIKE" || type === "COMMENT"){
      navigate(`/freeboard/${postId}`)
    }
  }

  const getPostTitle = async (contentId:number):Promise<string | any> => {
    try {
      const data: PostType = await getPost(contentId)
      console.log("AlarmListItem_컴포넌트",data)
      return data
    }
    catch (error) {
      console.log("AlarmListItem_컴포넌트",error)
    }
  }
  
  // Axios 요청
  // 모든 알람 가져오기
  const axiosReceiveAlarm = async ():Promise<void> => {
    try {
      const data: AlarmType[] | undefined = await recevieAlarm()
      console.log(data)
      WriteAlarmContent(data)
    }
    catch (error) {
      console.log("ReceiveAlarm",error)
    }
  }

  // 알람 전부 확인
  const axiosCheckAllAlarm = async ():Promise<void> => {
    try { await CheckAllAlarm() }
    catch (error) {
      console.log("ReceiveAlarm",error)
    }
  }

  // 알람 하나 확인
  const axiosCheckDetailAlarm = async (notiId):Promise<void> => {
    try { await CheckDetailAlarm(notiId) }
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
          <AlarmExitBtn 
            onClick={AlarmToggle} 
            src="/src/assets/Header/exit_btn.png" ></AlarmExitBtn>
        </AlarmHeader>

        <AlarmList>
          {alarmContent && alarmContent.map((alarm ,index) => (
            <AlarmListItem 
              key={index}
              onClick={
                () => DetailAlarmChecking(alarmContent[index])}>
              <AlarmItem>{alarmContent[index][0]}</AlarmItem>
              <AlarmTime>3분전</AlarmTime>
            </AlarmListItem>
          ))}
        </AlarmList>
      </AlarmListBox>
    </Container>
  )
}
export default AlarmSection