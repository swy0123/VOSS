import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { postRractice } from "/src/api/profile"
import { VideosType } from "/src/type/type"
import { videoFilterState } from "/src/recoil/Training"
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

function Video () {
  const [videoFilter] = useRecoilState<VideosType[]>(videoFilterState)

  const navigate = useNavigate()

  const goDubbing = async (id:number):Promise<void> => {
    navigate(`/dubbingroom/${id}`)
    void postRractice("DUB")
    window.location.reload()
  }

  const formatTime = (durationInSec: number) => {
    const minutes = Math.floor(durationInSec / 60)
    const second = Math.floor(durationInSec % 60)
    return `${minutes.toString().padStart(2, '0')}분 ${second.toString().padStart(2, '0')}초`
  }

  return (
    <VideoBox>
      {videoFilter.map((video,index) => (
        <VideoItem 
          key={index}
          onClick={() => void goDubbing(video.id)}>
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