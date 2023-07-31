import { useRecoilState } from "recoil";
import { Script } from "../../../type/type";
import { Container, Display, Title } from "./Video.style";
import { PlayChangebState } from "../../../recoil/hw_atom";


interface VideoProps {
  script : Script
}

function Video ({script}: VideoProps) {
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)

  const onYouTubeIframeAPIReady = () => {
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
  
  // index.html에 CDN을 동적으로 추가해주는 과정이라 생각하자
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  // if(!roles || !script) { return }  
  return(
    <Container>
      <Title>{script.title}</Title>
      <Display id="player"></Display>
    </Container>
  )
}
export default Video