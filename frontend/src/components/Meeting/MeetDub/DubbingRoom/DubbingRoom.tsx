import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { RoleModalState, meetDubSelectState, userSelectRoleState } from "/src/recoil/HW_Atom"
import { videoState } from "/src/recoil/Training"
import { getVideo } from "/src/api/video"
import { ScriptData } from "/src/type/type"
import Script from "./Script/Script"
import { 
  Container, 
  GoDubbingListBtn, 
  LeftSection,
  RightSection} from "./DubbingRoom.style"
import Video from "./Video/Video"
import RecordButton from "/src/components/DubbingRoom/RecordButton/RecordButton"
import Role from "./Role/Role"
import RoleSelectModal from "./RoleSelectModal/RoleSelectModal"
import { recieveMsg, sendMsg } from "/src/recoil/MeetDub"

function DubbingRoom () {
  const [meetDubSelect, setMeetDubSelect] = useRecoilState<number>(meetDubSelectState)
  const [userSelectRole, setUserSelectRole] = useRecoilState<string[]>(userSelectRoleState)
  const [roleModal, setRoleModal] = useRecoilState(RoleModalState)
  const [video, setVideo] = useRecoilState<ScriptData | null>(videoState)
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);
  
  const goDubbingList = () => {
    setMeetDubSelect(0)
    setUserSelectRole(["","","","","",""])
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
          roles={video.roles}></Role>
      </LeftSection>

      <RightSection>
        <GoDubbingListBtn 
          onClick={goDubbingList}>목록으로</GoDubbingListBtn>
        <Script 
          lines={video.lines}></Script>
        <RecordButton/>
      </RightSection>
      {roleModal && <RoleSelectModal roles={video.roles}/>}
    </Container>
  ) 
}
export default DubbingRoom