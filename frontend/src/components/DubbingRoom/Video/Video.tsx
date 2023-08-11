import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
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
import { timeState, youtubeState } from "/src/recoil/HW_Atom";

function Video ({script, roles, lines}: ScriptData) {
  const [playChange, setPlayChange] = useRecoilState<number[]>(PlayChangebState)
  const [isRoleSelect,setIsRoleSelect] = useRecoilState<boolean[]>(RoleSelectState)
  const [isScriptSelect,setIsScriptSelect] = useRecoilState<boolean[]>(ScriptSelectState)
  const [youtube, setYoutube] = useRecoilState<object|undefined>(youtubeState)
  const [time, setTime] = useRecoilState(timeState);
  const roleSelectRef = useRef<boolean[]>([])
  const scriptSelectRef = useRef<boolean[]>([])

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
      events: {
        'onStateChange' : onPlayStateChange,
      },
      playerVars:{
        "controls" : 0,
        "fs": 0,
        "modestbranding": 0,
        "modestbranding": 1,
      },
    });
    setYoutube(player)
  }

  // 영상 상태 변경
  const onPlayStateChange = (event) => {
    const nowTime = event.target.getCurrentTime() * 10;
    console.log(nowTime)
    if (event.data == YT.PlayerState.PLAYING) {
      setPlayChange([1, Math.floor(nowTime)]);
      console.log("시작")
    }
    else if (event.data == YT.PlayerState.PAUSED) {
      setPlayChange([2, Math.floor(nowTime)]);
      console.log("종료")
    }
  }

  // 영상 대사별 Mute
  const onMuteChange = () => {
    for (const [index, line] of lines.entries()) {
      if ( scriptSelectRef.current[index] ){
        if (time ===1 && line.startSec === 0 ){
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
          youtube.unMute()
          return
        }
      }
    }
  }

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
  

  return(
    <Container>
      <Title>{script.title}<span style={{fontSize:'20px'}}>  Time : {time}</span></Title>
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