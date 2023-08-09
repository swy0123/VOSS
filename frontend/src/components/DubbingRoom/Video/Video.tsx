import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ScriptData } from "../../../type/type";
import { 
  Container, 
  Display, 
  RoleBox, 
  RoleButton, 
  Title } from "./Video.style";
import { 
  PlayChangebState, 
  RoleSelectState, 
  ScriptSelectState } from "../../../recoil/Training";

function Video ({script, roles, lines}: ScriptData) {
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const [isRoleSelect,setIsRoleSelect] = useRecoilState<boolean[]>(RoleSelectState)
  const [isScriptSelect,setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  const roleSelectRef = useRef<boolean[]>([])
  const scriptSelectRef = useRef<boolean[]>([])

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
    const player = new YT.Player('player', {
      videoId: script.videoUrl.slice(-11),
      events: {
        'onStateChange' : onPlayStateChange,
      },
      playerVars:{
        'controls' : 0,
      },
    });
  }

  // 영상 대사별 Mute
  const onPlayStateChange = async (event) => {
    if (event.data == YT.PlayerState.PLAYING) {
      let nowTime = event.target.getCurrentTime();
      setPlayChange([1, Math.floor(nowTime)]);
      for (const [index, line] of lines.entries()) {
        if (scriptSelectRef.current[index] === true) {
          if (nowTime <= line.endSec) {
            if (line.startSec <= nowTime && nowTime <= line.endSec || line.startSec === 0) {
              event.target.mute();
    
              await new Promise((resolve) => {
                setTimeout(() => {
                  event.target.unMute();
                  resolve();
                }, 1000 * (line.endSec - line.startSec + 1));
              });
    
              nowTime = line.endSec + 1;
            } 

            else if (nowTime < line.startSec) {
              await new Promise((resolve) => {
                setTimeout(() => {
                  event.target.mute();
                  resolve();
                }, 1000 * (line.startSec - nowTime));
              });
    
              await new Promise((resolve) => {
                setTimeout(() => {
                  event.target.unMute();
                  resolve();
                }, 1000 * (line.endSec - line.startSec));
              });
    
              nowTime = line.endSec + 1;
            }
          }
        } 
        else if (scriptSelectRef.current[index] === false) {
          if (nowTime <= line.endSec) {
            await new Promise((resolve) => {
              setTimeout(() => {
                console.log("waiting");
                resolve();
              }, 1000 * (line.endSec - nowTime + 1));
            });
  
            nowTime = line.endSec + 1;
          }
        }
      }
    } else if (event.data == YT.PlayerState.PAUSED) {
      setPlayChange([2, Math.floor(event.target.getCurrentTime())]);
    }
  };
  
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