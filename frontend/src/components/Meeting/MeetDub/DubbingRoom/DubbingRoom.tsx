import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { meetDubSelectState } from "/src/recoil/HW_Atom"
import { videoState } from "/src/recoil/Training"
import { getVideo } from "/src/api/video"
import { ScriptData } from "/src/type/type"
import Script from "./Script/Script"
import { 
  Container, 
  GoDubbingListBtn } from "./DubbingRoom.style"
import Video from "./Video/Video"

function DubbingRoom () {
  const [meetDubSelect, setMeetDubSelect] = useRecoilState<number>(meetDubSelectState)
  const [video, setVideo] = useRecoilState<ScriptData | null>(videoState)
  
  const goDubbingList = () => {setMeetDubSelect(0)}

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
  }, [meetDubSelect]);

  // 로딩 페이지가 하나 더 있으면 좋겠다.
  if (!video) {return <div>Loading...</div>;}

  return (
    <Container>
      <Video 
        script={video.script}
        roles={video.roles}
        lines={video.lines}></Video>
      <Script 
        lines={video.lines}></Script>
      <GoDubbingListBtn 
        onClick={goDubbingList}>목록으로</GoDubbingListBtn>
    </Container>
  ) 
}
export default DubbingRoom