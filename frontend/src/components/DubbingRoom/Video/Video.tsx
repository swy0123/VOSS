import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { ScriptData } from "../../../type/type";
import { useNavigate } from "react-router-dom";

// 리코일
import { 
  PlayChangebState, 
  RoleSelectState, 
  ScriptSelectState } from "../../../recoil/Training";
import { 
  PlayTriggerState, 
  timeState } from "/src/recoil/HW_Atom";

// 스타일
import { 
  BackButton,
  Container, 
  Display, 
  HeaderSection, 
  RoleBox, 
  RoleButton, 
  Title,
  Thumbnail, 
  ProtectSection,
  ImgSection,
  Manual} from "./Video.style";
  import Loading from '/src/components/Loading';
    
function Video ({script, roles, lines}: ScriptData) {
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const [playTrigger, setPlayTrigger] = useRecoilState<number>(PlayTriggerState)
  const [isRoleSelect,setIsRoleSelect] = useRecoilState<boolean[]>(RoleSelectState)
  const [isScriptSelect,setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  const [youtube, setYoutube] = useState<object|undefined>(undefined)
  const [time, setTime] = useRecoilState(timeState);
  const roleSelectRef = useRef<boolean[]>([])
  const scriptSelectRef = useRef<boolean[]>([])
  const navigate = useNavigate() 
  
  // 역할 선택
  const handleRoleBtn = (index: number) => {
    const newRoleSelect = Array(roles.length).fill(false)
    newRoleSelect[index] = !isRoleSelect[index]
    setIsRoleSelect(newRoleSelect)
    roleSelectRef.current = newRoleSelect

    if (newRoleSelect[index] === true){
      const newScriptSelect = lines.map((line) => line.name===roles[index])
      setIsScriptSelect(() => newScriptSelect)
      scriptSelectRef.current = newScriptSelect
      }

    else if (newRoleSelect[index] === false){
      const newScriptSelect = Array(roles.length).fill(false)
      setIsScriptSelect(newScriptSelect)
      scriptSelectRef.current = newScriptSelect
      }
  }

  // 동영상 출력
  const onYouTubeIframeAPIReady = () => {
    const player = new YT.Player('player', {
      videoId: script.videoUrl.slice(-11),
      playerVars:{
        "controls" : 0,
        "disablekb" : 1,
        // 'autoplay' : 1,
      },
    });
    setYoutube(player)
  }

  // 영상 상태 변경  
  const onPlayStateChange = async () => {
    // 영상 시작
    if (playTrigger === 1){
      await youtube.playVideo()
      setPlayChange([1, Math.floor(youtube.getCurrentTime() * 10)]);
    }
    
    // 영상 일시 정지
    else if (playTrigger === 2){
      await youtube.pauseVideo()
      setPlayChange([2, Math.floor(youtube.getCurrentTime() * 10)]);
    }
    
    // 영상 다시 시작 준비
    else if (playTrigger === 0){
      await youtube.seekTo(0)
      setPlayChange([2, 0]);
    }

    // 뮤트 시키고 영상 재생
    else if (playTrigger === 3){
      await youtube.mute()
      await youtube.playVideo();
      setPlayChange([1, Math.floor(youtube.getCurrentTime() * 10)]);
    }
  }

  // 영상 대사별 Mute
  const onMuteChange = () => {
    for (const [index, line] of lines.entries()) {
      if ( scriptSelectRef.current[index] ){
        if (time === 1 && line.startSec === 0 ){
          youtube.mute()
          // console.log("Sec,mute",time)
          return
        }

        else if ( time >= line.startSec && time <= line.endSec ) {
          youtube.mute()
          // console.log("start-end,mute",time)
          return
        }
      }
      else if (scriptSelectRef.current[index] === false) {
        if( time >= line.startSec && time <= line.endSec) {
          // console.log("end,unmute",time)
          if(playTrigger===3){ return }
          youtube.unMute()
          return
        }
      }
    }
  }

  const goDubbingList = () => {
    navigate("/dubbinglist")
  }

  useEffect(()=>{
    void onPlayStateChange()
  },[playTrigger])

  useEffect(()=>{
    onMuteChange()
  },[time])

  useEffect(() => {
    // index.html에 CDN을 동적으로 추가해주는 과정이라 생각하자
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  }, [])
  
  // 로딩 페이지가 하나 더 있으면 좋겠다.
  // if (!youtube) {return <Loading/>;}

  return(
    <Container>

      <HeaderSection>
        <Title>{script.title}</Title>
        <BackButton
          onClick={goDubbingList}>목록으로</BackButton>
      </HeaderSection>

      <Display id="player"></Display>
      {playTrigger ? (
        <ProtectSection></ProtectSection>
        ) : (
        <ImgSection>
          <Thumbnail 
            src={`https://img.youtube.com/vi/${script.videoUrl.slice(-11)}/mqdefault.jpg`}/>
        </ImgSection>
        )
      }

      <RoleBox>
          {roles.map((role,index) => (
            <RoleButton 
              key={index}
              $IsClick={isRoleSelect[index]}
              onClick={()=>handleRoleBtn(index)}
              > {role}
            </RoleButton>
          ))}
      </RoleBox>
    </Container>
  )
}
export default Video





// // 영상 상태 변경 일단 보관

// events: {
//   'onStateChange' : onPlayStateChange,
// },

// const onPlayStateChange = (event) => {
//   const nowTime = event.target.getCurrentTime() * 10;
//   console.log(nowTime)
//   if (event.data == YT.PlayerState.PLAYING) {
//     setPlayChange([1, Math.floor(nowTime)]);
//   }
//   else if (event.data == YT.PlayerState.PAUSED) {
//     setPlayChange([2, Math.floor(nowTime)]);
//   }
// }