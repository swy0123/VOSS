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
  AlarmBox,
} from "./AlarmSection.style";
import { recevieAlarm } from "/src/api/alarm";
import { AlarmType } from "/src/type/hw_type";
import { getPost } from "/src/api/FreeBoard";
import { PostType } from "/src/type/FreeBoard";

interface Headertype {
  AlarmIsShown : boolean,
  setAlarmIsshown : Dispatch<SetStateAction<boolean>>,
}

function AlarmSection({ AlarmIsShown, setAlarmIsshown }: Headertype) {
  const AlarmToggle = () => {setAlarmIsshown((IsShown) => !IsShown)}
  const [alarmContent, setAlarmContent] = useState<string[]>([])

  const WriteAlarmContent = (alarmList:AlarmType[]) => {
    const alarmContentTmp:string[] = []
    alarmList?.map((alarm, index) => {
      const senderNickname = alarm.senderNickname
      const contentId = alarm.contentId
      const type = alarm.type

      if (type === "FOLLOW") {
        const content = `${senderNickname}님이 회원님을 팔로우 했습니다.`
        alarmContentTmp.push(content)
      }

      else if (type === "POST_LIKE") {
        getPostTitle(contentId)
          .then (title => {
            const content = `${senderNickname}님이 '${title}' 게시글을 좋아합니다.`
            alarmContentTmp.push(content)
          })
          .catch(error => {
            console.log(error)
          })
      }

      else if (type=== "COMMENT") {
        getPostTitle(contentId)
          .then (title => {
            const content = `${senderNickname}님이 '${title}' 게시글에 댓글을 달았습니다.`
            alarmContentTmp.push(content)
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

  const getPostTitle = async (contentId:number):Promise<string | any> => {
    try {
      const data: PostType = await getPost(contentId)
      console.log("AlarmListItem_컴포넌트",data.title)
      return data.title
    }
    catch (error) {
      console.log("AlarmListItem_컴포넌트",error)
    }
  }
  

  const axiosReceiveAlarm = async ():Promise<void> => {
    try {
      const data: AlarmType[] | undefined = await recevieAlarm()
      WriteAlarmContent(data)
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
          <AlarmExitBtn 
            onClick={AlarmToggle} 
            src="/src/assets/Header/exit_btn.png" ></AlarmExitBtn>
        </AlarmHeader>

        <AlarmList>
          {alarmContent && alarmContent.map((alarm ,index) => (
            <AlarmBox>
              <AlarmItem>{alarmContent[index]}</AlarmItem>
              <AlarmTime>3분전</AlarmTime>
            </AlarmBox>
          ))}
        </AlarmList>
      </AlarmListBox>
    </Container>
  )
}
export default AlarmSection