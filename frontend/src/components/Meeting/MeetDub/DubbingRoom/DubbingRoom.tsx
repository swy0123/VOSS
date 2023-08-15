import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { videoState } from "/src/recoil/Training"
import { getVideo } from "/src/api/video"
import { ScriptData } from "/src/type/type"
import Script from "./Script/Script"
import { 
  MeetDubRecordState,
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

function DubbingRoom ({meetRoomId}:number) {
  const [meetDubSelect, setMeetDubSelect] = useRecoilState<number>(meetDubSelectState)
  const [meetDubRecord, setMeetDubRecord] = useRecoilState(MeetDubRecordState)
  const [meetDubUser] = useRecoilState<number>(meetDubUserState);
  const [userSelectRole, setUserSelectRole] = useState<string[]>(Array(meetDubUser).fill(""))
  const [video, setVideo] = useRecoilState<ScriptData | null>(videoState)
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);
  
  const goDubbingList = () => {
    setMeetDubSelect(0)
    setMeetDubRecord("")
    setUserSelectRole(Array(meetDubUser).fill(""))
    setSend("/golist")
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
      goDubbingList()
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
        <RecordButton meetRoomId={meetRoomId}/>
      </RightSection>
    </Container>
  ) 
}
export default DubbingRoom

// 모달창 일단 보류
// {roleModal && <RoleSelectModal roles={video.roles}/>}
// const [roleModal, setRoleModal] = useRecoilState(RoleModalState)
