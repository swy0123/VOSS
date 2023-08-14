import { useState, useEffect, useRef } from "react";

// 리코일
import { useRecoilState } from "recoil";
import { MeetDubPlayChangebState } from "/src/recoil/HW_Atom";
import { ScriptData } from "/src/type/type";
import { 
  Container, 
  Display, 
  ImgSection, 
  ProtectSection, 
  Thumbnail, 
  Title, 
  VideoBox, 
  VideoPause, 
  VideoPlay, 
  YoutubeIcon} from "./Video.style";
import { recieveMsg, sendMsg } from "/src/recoil/MeetDub";

interface YTPlayer {
  new (id: string, options: object): any; // YT.Player 생성자의 타입
}

declare global {
  interface Window {
    YT: {
      Player: YTPlayer; // YT.Player 타입으로 지정
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

function Video ({script, roles, lines}: ScriptData) {
  const [meetDubPlayChange, setMeetDubPlayChange] = useRecoilState<number[]>(MeetDubPlayChangebState)
  const [send, setSend] = useRecoilState(sendMsg);
  const [recieve, setRecieve] = useRecoilState(recieveMsg);
  const [youtube, setYoutube] = useState<object|undefined>("")

  // 동영상 출력
  const onYouTubeIframeAPIReady = () => {
    const player:unknown = new YT.Player('player', {
      videoId: script.videoUrl.slice(-11),
      playerVars:{
        'controls' : 0,
        'mute' : 1,
        'autoplay' : 1,
      },
    });
    setYoutube(player)
  }

  // 처음 영상 시작
  const onPlayerReady = () => {
    setSend("/startvideo")
  }

  // 영상 플레이
  const SelfPlayVideo = () => {
    setSend("/playvideo")
  }
  
  // 영상 일시정지
  const SelfPauseVideo = () => {
    setSend("/pausevideo")
  }

  //이벤트 수신 감지
  useEffect(()=>{
    if(recieve=="/startvideo") {
      onYouTubeIframeAPIReady()
      setMeetDubPlayChange([1, 0]) // 로딩떄문에 0 부적절, 개선 필요
      setRecieve("/none");
    }
    else if(recieve=="/playvideo") {
      const nowTime = youtube.getCurrentTime() % script.durationInSec
      setMeetDubPlayChange([1, Math.floor(nowTime)])
      youtube.playVideo()
      setRecieve("/none");
    }
    else if(recieve=="/pausevideo") {
      const nowTime = youtube.getCurrentTime() % script.durationInSec
      setMeetDubPlayChange([2, Math.floor(nowTime)])
      youtube.pauseVideo()
      setRecieve("/none");
    }
  }, [recieve])

  // index.html에 CDN을 동적으로 추가해주는 과정
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    // window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
  }, [])
  
  return(
    <Container>
      <Title>{script.title}</Title>
      <VideoBox>
      <Display id="player"></Display>
      {youtube ? ( 
        <ProtectSection>
          {!(meetDubPlayChange[0]-1) ? (
            <VideoPause
              onClick={SelfPauseVideo}
              src="/src/assets/Meeting/pausebutton.png"/>
            ) : (
            <VideoPlay
              onClick={SelfPlayVideo}
              src="/src/assets/Meeting/playbutton.png"/>
          )}
        </ProtectSection>
        ):(
        <ImgSection>
          <Thumbnail
            src={`https://img.youtube.com/vi/${script.videoUrl.slice(-11)}/mqdefault.jpg`}/>
          <YoutubeIcon 
            onClick={onPlayerReady}
            src="/src/assets/Meeting/youtube.png"/>
        </ImgSection>
        )
      }
      </VideoBox>
    </Container>
  )
}
export default Video