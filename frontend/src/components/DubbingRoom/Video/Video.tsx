import { Script } from "../../../type/type";
import { Container, Display, Title } from "./Video.style";

interface VideoProps {
  script : Script
}

function Video ({script}: VideoProps) {

  const onYouTubeIframeAPIReady = () => {
    const player = new YT.Player('player', {
      videoId: script.videoUrl.slice(-11),
      events: {
        'onReady': onPlayerReady,
      }
    });
  }
  
  const onPlayerReady = (event) => {
    event.target.playVideo();
  }

  // index.html에 CDN을 동적으로 추가해주는 과정이라 생각하자
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  return(
    <Container>
      <Title>{script.title}</Title>
      <Display id="player"></Display>
    </Container>
  )
}
export default Video