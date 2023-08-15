import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { videoFilterState } from "/src/recoil/Training"
import { MeetDubPlayChangebState, meetDubSelectState } from "/src/recoil/HW_Atom"
import { postRractice } from "/src/api/profile"
import { VideosType } from "/src/type/type"
import { 
  Count, 
  CountImg, 
  Description, 
  Infos, 
  Thumbnail, 
  Time, 
  TimeImg, 
  VideoBox, 
  VideoItem } from "./Video.style"
import { recieveMsg, sendMsg } from "/src/recoil/MeetDub"
import { meetScriptData, postMeetScript } from "/src/api/meeting"

function Video ({meetRoomId}:number) {
  const [videoFilter] = useRecoilState<VideosType[]>(videoFilterState)
  const [meetDubSelect, setMeetDubSelect] = useRecoilState<number>(meetDubSelectState)
  const [meetDubPlayChange, setMeetDubPlayChange] = useRecoilState<number[]>(MeetDubPlayChangebState)
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);
  
  const meetDubSelecting = async (id:number) => {
    const scriptData:meetScriptData = {
      meetRoomId : meetRoomId,
      scriptId : id
    }
    await postMeetScript(scriptData);
    setSend(`/govideo${id}`)
    // void postRractice("DUB")
  }
  
  const formatTime = (durationInSec: number) => {
    const minutes = Math.floor(durationInSec / 60)
    const second = Math.floor(durationInSec % 60)
    return `${minutes.toString().padStart(2, '0')}분 ${second.toString().padStart(2, '0')}초`
  }
  
  //이벤트 수신 감지
  useEffect(() => {
    if(recieve.slice(0,8)==`/govideo`) {
      setMeetDubSelect(parseInt(recieve.slice(8,10)))
      setMeetDubPlayChange([2, 0])
      setRecieve("/none");
    }
  }, [recieve])

  return (
    <VideoBox>
      {videoFilter.map((video,index) => (
        <VideoItem 
          key={index}
          onClick={() => void meetDubSelecting(video.id)}>
          <Thumbnail src={`https://img.youtube.com/vi/${video.videoUrl.slice(-11)}/mqdefault.jpg`}></Thumbnail>
          {/* <Thumbnail 
            key={`player-${index}`} 
            id={`player-${index}`}></Thumbnail> */}
          <Infos>
            <Count>
              <CountImg src="/src/assets/Dubbing/count.png"/>
              {video.roleCnt}인
            </Count>
            <Time>
              <TimeImg src="/src/assets/Dubbing/time.png"/>
              {formatTime(video.durationInSec)}
            </Time>
          </Infos>
          
          <Description>{video.title}</Description>
        </VideoItem>
      ))}
    </VideoBox>
  )
}
export default Video