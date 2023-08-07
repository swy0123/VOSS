import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { ScriptData } from "/src/type/type";
import { meetDubSelectState } from "/src/recoil/HW_Atom";
import { 
  Box,
  Container, 
  Display, 
  ImgSection, 
  RoleBox, 
  RoleButton, 
  Thumbnail, 
  Title, 
  YoutubeIcon} from "./Video.style";
import { 
  RoleSelectState, 
  ScriptSelectState} from "/src/recoil/Training";

function Video ({script, roles, lines}: ScriptData) {
  const [isRoleSelect,setIsRoleSelect] = useRecoilState<boolean[]>(RoleSelectState)
  const [isScriptSelect,setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  const roleSelectRef = useRef<boolean[]>([])
  const scriptSelectRef = useRef<boolean[]>([])
  const [chagneDisplay, setChangeDisplay] = useState<boolean>(true)
  const [youtube, setYoutube] = useState("")

  // 역할 선택
  const handleRoleBtn = (index: number) => {
    const newRoleSelect = Array(roles.length).fill(false)
    newRoleSelect[index] = !isRoleSelect[index]
    setIsRoleSelect(() => newRoleSelect)
    roleSelectRef.current = newRoleSelect

    if (newRoleSelect[index] === true){
      const newScriptSelect = lines.map((line) => line.name===roles[index])
      setIsScriptSelect(() => newScriptSelect)
      scriptSelectRef.current = newScriptSelect
      }
  }

  // 동영상 출력
  const onYouTubeIframeAPIReady = () => {
    let player = new YT.Player('player', {
      videoId: script.videoUrl.slice(-11),
      events: {
        'onReady': onPlayerReady,
      }
    });
    setYoutube(player)
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 영상 플레이
  const SelfPlayVideo = () => {
    youtube.playVideo()
  }
  
  // 영상 일시정지
  const SelfPauseVideo = () => {
    youtube.pauseVideo()
  }
  useEffect(() => {
    // index.html에 CDN을 동적으로 추가해주는 과정이라 생각하자
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
  }, [])
  
  const onChagneDisplay = () => {
    onYouTubeIframeAPIReady()
    setChangeDisplay(false)
  }

  return(
    <Container>
      {/* 영상 플레이 or 일시정지 예시 */}
      <button onClick={SelfPlayVideo}>Play</button>
      <button onClick={SelfPauseVideo}>Pause</button>
      <Title>{script.title}</Title>
      <Box>
      <Display id="player"></Display>
      {youtube ?( 
        ""
        ):(
        <ImgSection>
          <Thumbnail
            src={`https://img.youtube.com/vi/${script.videoUrl.slice(-11)}/mqdefault.jpg`}/>
          <YoutubeIcon 
            onClick={onYouTubeIframeAPIReady}
            src="/src/assets/Meeting/youtube.png"/>
        </ImgSection>
        )}
      </Box>
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