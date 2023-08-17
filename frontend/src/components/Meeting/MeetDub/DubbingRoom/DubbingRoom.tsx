import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { videoState } from "/src/recoil/Training"
import { getVideo } from "/src/api/video"
import { ScriptData } from "/src/type/type"
import Script from "./Script/Script"
import { 
  MeetDubRecordState,
  RecordTriggerState,
  meetDubSelectState, 
  meetDubUserState } from "/src/recoil/HW_Atom"
import { 
  Container, 
  GoDubbingListBtn, 
  LeftSection,
  RightSection} from "./DubbingRoom.style"
import Video from "./Video/Video"
import Role from "./Role/Role"
import { recieveMsg, sendMsg } from "/src/recoil/MeetDub"
import RecordButton from "./RecordButton/RecordButton"
import { meetScriptData, postMeetScript } from "/src/api/meeting"

function DubbingRoom ({meetRoomId}:number) {
  const [meetDubSelect, setMeetDubSelect] = useRecoilState<number>(meetDubSelectState)
  const [meetDubRecord, setMeetDubRecord] = useRecoilState(MeetDubRecordState)
  const [meetDubUser] = useRecoilState<number>(meetDubUserState);
  const [userSelectRole, setUserSelectRole] = useState<string[]>(Array(meetDubUser).fill(""))
  const [video, setVideo] = useRecoilState<ScriptData | null>(videoState)
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);

  
  const [recordTrigger, setRecordTrigger] = useRecoilState<number>(RecordTriggerState)
  
  const goDubbingList = () => {
    setSend("/golist")
    console.log("goDubbingList")
  }

  const handleRecieveMsg = async () =>{
    console.log("handleRecieveMsg")
    setMeetDubSelect(0)
    setMeetDubRecord("")
    setRecordTrigger(0);
    setVideo(null)
    setUserSelectRole(Array(meetDubUser).fill(""))
    
    const scriptData:meetScriptData = {
      meetRoomId : meetRoomId,
      scriptId : 0
    }
    await postMeetScript(scriptData);
  }

  const axiosVideo = async (id:number):Promise<void> => {
    try {
      const VideoData:ScriptData = await getVideo(id);
      setVideo(VideoData);
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void axiosVideo(meetDubSelect);
  }, []);

  //이벤트 수신 감지
  useEffect(()=>{
    if(recieve=="/golist") {
      handleRecieveMsg();
      setRecieve("/none");
    }
  }, [recieve])
  
  // 로딩 페이지가 하나 더 있으면 좋겠다.
  if (!video) {return <div>Loading...</div>;}

  return (
    <Container>
      <LeftSection>
        <Video 
          script={video.script}
          roles={video.roles}
          lines={video.lines}></Video>
        <Role
          roles={video.roles}
          userSelectRole={userSelectRole}
          setUserSelectRole={setUserSelectRole}></Role>
      </LeftSection>

      <RightSection>
        <GoDubbingListBtn 
          onClick={goDubbingList}>목록으로</GoDubbingListBtn>
        <Script 
          lines={video.lines}></Script>
        <RecordButton 
          meetRoomId={meetRoomId}
          script={video.script}/>
      </RightSection>
    </Container>
  ) 
}
export default DubbingRoom

// 모달창 일단 보류
// {roleModal && <RoleSelectModal roles={video.roles}/>}
// const [roleModal, setRoleModal] = useRecoilState(RoleModalState)
