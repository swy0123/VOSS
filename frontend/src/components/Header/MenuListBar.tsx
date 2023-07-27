import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuBox,
  Menuitems,
  Item,
} from "./MenuListBar.style";


interface Headertype {
  setMenuIsShown : Dispatch<SetStateAction<boolean>>
}

function MenuListBar({setMenuIsShown}:Headertype) {
  // Router Link와 동일한 부분
  const navigate = useNavigate()  
  const goVoiceAnalysis = () => {navigate("/analysis")}
  const goDubbingList = () => {navigate("/dubbinglist")}
  const goAccent = () => {navigate("/accent")}
  const goFreeBoard = () => {navigate("/freeboard")}
  const goMeetingBoard = () => {navigate("/meeting")}


  return(
    <MenuBox 
      onMouseEnter={() => setMenuIsShown(true)}
      onMouseLeave={() => setMenuIsShown(false)}>
      <Menuitems>
        <Item onClick={goVoiceAnalysis}>목소리 분석</Item>  
        <Item onClick={goDubbingList}>더빙 연습</Item>  
        <Item onClick={goAccent}>발음 연습</Item>  
      </Menuitems>

      <Menuitems>
        <Item onClick={goMeetingBoard}>화상 회의</Item>  
      </Menuitems>     
    
      <Menuitems>
        <Item onClick={goFreeBoard}>자유게시판</Item>  
        <Item>녹음게시판</Item>  
      </Menuitems>
    </MenuBox>
  )
}

export default MenuListBar