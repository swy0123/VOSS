import { useState, useEffect, useRef } from "react";

// 리코일
import { useRecoilState } from "recoil";
import { MeetDubPlayChangebState, RecordTriggerState } from "/src/recoil/HW_Atom";
import { ScriptData } from "/src/type/type";
import { 
  ButtonBox,
  Container, 
  Display, 
  ImgSection, 
  ProtectSection, 
  Thumbnail, 
  Title, 
  VideoBox, 
  VideoPause, 
  VideoPlay, 
  VideoReset, 
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
  const [recordTrigger,setRecordTrigger] = useRecoilState<number>(RecordTriggerState)


  // 동영상 출력
  const onYouTubeIframeAPIReady = () => {
    const player:unknown = new YT.Player('player', {
      videoId: script.videoUrl.slice(-11),
      playerVars:{
        'controls' : 0,
        'autoplay' : 1,
        'mute' : recordTrigger ? 1 : 0,
      },
    });
    setYoutube(player)
  }

  //================Record 버튼으로 영상제어================
  // 영상 상태 변경  
  const onPlayStateChange = async () => {
    // 영상 시작
    if (recordTrigger === 1){
      if(!youtube){ 
        await onYouTubeIframeAPIReady()
      }
      await youtube.mute()
      await youtube.playVideo()
      setMeetDubPlayChange([1, Math.floor(youtube.getCurrentTime() * 10)]);
    }
    
    // 영상 정지
    else if (recordTrigger === 0){
      if(!youtube) return;
      await youtube.pauseVideo()
      await youtube.seekTo(0)
      setMeetDubPlayChange([2, 0]);
    }
  }

  useEffect(()=>{
    void onPlayStateChange()
  },[recordTrigger])

  //=====================Video로 영상 제어=======================
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

  // 영상 처음으로
  const SelfResetVideo = () => {
    setSend("/resetvideo")
  }

  // 이벤트 수신 감지
  useEffect(()=>{
    if(recieve=="/startvideo") {
      if(!youtube) {
        onYouTubeIframeAPIReady()
      }
      setMeetDubPlayChange([1, 0]) // 로딩떄문에 0 부적절, 개선 필요
      setRecieve("/none");
    }

    else if(recieve=="/playvideo") {
      const nowTime = youtube.getCurrentTime() % script.durationInSec
      setMeetDubPlayChange([1, Math.floor(nowTime)])
      youtube.unMute()
      youtube.playVideo()
      setRecieve("/none");
    }

    else if(recieve=="/pausevideo") {
      const nowTime = youtube.getCurrentTime() % script.durationInSec
      setMeetDubPlayChange([2, Math.floor(nowTime)])
      youtube.pauseVideo()
      setRecieve("/none");
    }

    else if(recieve=="/resetvideo") {
      setMeetDubPlayChange([2, 0])
      youtube.seekTo(0)
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
    // onYouTubeIframeAPIReady()
  }, [])
  
  return(
    <Container>
      <Title>{script.title}</Title>
      <VideoBox>
      <Display id="player"></Display>
      {youtube ? ( 
        <ProtectSection>
          {recordTrigger ? (
            ""
          ):(
            <ProtectSection>
              {!(meetDubPlayChange[0]-1) ? (
                <VideoPause
                  onClick={SelfPauseVideo}
                  src="/src/assets/Meeting/pausebutton.png"/>
                ) : (
                <ButtonBox>
                  <VideoPlay
                    onClick={SelfPlayVideo}
                    src="/src/assets/Meeting/playbutton.png"/>
                  <VideoReset
                    onClick={SelfResetVideo}
                    src="/src/assets/Meeting/restartbutton.png"/>
                </ButtonBox>
              )}
            </ProtectSection>
          )}
          </ProtectSection>
        ):(
        <ImgSection>
          <Thumbnail
            src={`https://img.youtube.com/vi/${script.videoUrl.slice(-11)}/mqdefault.jpg`}/>
          <YoutubeIcon 
            onClick={onPlayerReady}
            src="/src/assets/Meeting/playbutton.png"/>
        </ImgSection>
        )
      }
      </VideoBox>
    </Container>
  )
}
export default Video