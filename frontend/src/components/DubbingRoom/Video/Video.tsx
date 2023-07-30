import { useRecoilState } from "recoil";
import { Script, ScriptData } from "../../../type/type";
import { Container, Display, Title } from "./Video.style";
import { PlayChangebState, ScriptSelectState, videoState } from "../../../recoil/hw_atom";
import { useEffect } from "react";

interface VideoProps {
  script : Script
}

function Video ({script}: VideoProps) {
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const [isScriptSelect,setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  const [video, setVideo] = useRecoilState<ScriptData | null>(videoState)

  const onYouTubeIframeAPIReady = () => {
    const player = new YT.Player('player', {
      videoId: script.videoUrl.slice(-11),
      events: {
        'onStateChange' : onPlayStateChange,
      }
    });
  }

  // setTimeout(() => {
  //   event.target.mute();
  // }, 3000);

  const onPlayStateChange = (event) => {
    if (event.data == YT.PlayerState.PLAYING) {
      let nowTime = Math.floor(event.target.getCurrentTime())
      setPlayChange([1,nowTime])
      console.log(nowTime)
      console.log(isScriptSelect)
      
      video.lines.forEach((line,index)=> {
        if(isScriptSelect[index]==false){
          if(nowTime >= line.startSec && nowTime <= line.endSec){
            event.target.mute()
            setTimeout(() => {
              event.target.unMute()
              nowTime = line.endSec
            },(line.endSec-nowTime)*1000)
          }
          else if(nowTime < line.startSec){
            setTimeout(() => {
              event.target.mute()
            },(line.startSec-nowTime)*1000)

            setTimeout(() => {
              event.target.unMute()
              nowTime = line.endSec
            },(line.endSec-line.startSec)*1000)

          }
        }        
      })
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

  return(
    <Container>
      <Title>{script.title}</Title>
      <Display id="player"></Display>
    </Container>
  )
}
export default Video