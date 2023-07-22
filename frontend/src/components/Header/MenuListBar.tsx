import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const MenuBox = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  background-color: #222222;
  border-radius: 0px 0px 5px 5px;
  border-top: 0.25px solid grey;
  height: 100px;
  width: 265px;
  margin-left: 135px;
  z-index: 1;
  top: 46px;
`
const Menuitems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const Item = styled.div`
  color  : white;
  font-size: 11px;
  margin: 9px auto;
  cursor: pointer;
`
interface Headertype {
  setMenuIsShown : Dispatch<SetStateAction<boolean>>
}

function MenuListBar({setMenuIsShown}:Headertype) {
  // Router Link와 동일한 부분
  const navigate = useNavigate()  
  const goVoiceAnalysis = () => {navigate("/analysis")}
  const goDubbing = () => {navigate("/dubbing")}
  const goAccent = () => {navigate("/accent")}

  return(
    <MenuBox 
      onMouseEnter={() => setMenuIsShown(true)}
      onMouseLeave={() => setMenuIsShown(false)}>
      <Menuitems>
        <Item onClick={goVoiceAnalysis}>목소리 분석</Item>  
        <Item onClick={goDubbing}>더빙 연습</Item>  
        <Item onClick={goAccent}>발음 연습</Item>  
      </Menuitems>

      <Menuitems>
        <Item>화상 회의</Item>  
      </Menuitems>     
    
      <Menuitems>
        <Item>자유게시판</Item>  
        <Item>녹음게시판</Item>  
      </Menuitems>
    </MenuBox>
  )
}

export default MenuListBar