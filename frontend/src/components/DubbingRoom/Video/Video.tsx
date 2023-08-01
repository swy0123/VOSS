import { useRecoilState } from "recoil";
import { Script } from "../../../type/type";
import { Container, Display, Title } from "./Video.style";
import { PlayChangebState, RoleSelectState, ScriptSelectState } from "../../../recoil/Training";
import { useEffect } from "react";

interface VideoProps {
  script : Script
}

function Video ({script}: VideoProps) {
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const [isRoleSelect,setIsRoleSelect] = useRecoilState<boolean[]>(RoleSelectState)
  const [isScriptSelect,setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  
  console.log("밖에는")
  const onYouTubeIframeAPIReady = () => {
    console.log("여기는")
    const player = new YT.Player('player', {
      videoId: script.videoUrl.slice(-11),
      events: {
        'onStateChange' : onPlayStateChange,
      }
    });
  }
  const onPlayStateChange = (event) => {
    if (event.data == YT.PlayerState.PLAYING) {
      setPlayChange([1,Math.floor(event.target.getCurrentTime())])
    }
    else if (event.data == YT.PlayerState.PAUSED) {
      setPlayChange([2,Math.floor(event.target.getCurrentTime())])
    }
  }
  
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
  

  return(
    <Container>
      <Title>{script.title}</Title>
      <Display id="player"></Display>
    </Container>
  )
}
export default Video