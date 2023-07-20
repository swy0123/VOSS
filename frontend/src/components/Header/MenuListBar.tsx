import { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";

const MenuBox = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #222222;
  position: fixed;
  margin-left: 150px;
  height: 100px;
  width: 320px;
  border-radius: 0px 0px 5px 5px;
  z-index: 1;
  top: 71px;
`
const Menuitems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

`
const Item = styled.div`
  color  : white;
  font-size: 13px;
  margin: 7px auto;
  cursor: pointer;
`
interface Headertype {
  setMenuIsShown : Dispatch<SetStateAction<boolean>>
}

function MenuListBar({setMenuIsShown}:Headertype) {
  return(
    <MenuBox 
    onMouseEnter={() => setMenuIsShown(true)}
    onMouseLeave={() => setMenuIsShown(false)}>
      <Menuitems>
        <Item>목소리 분석</Item>  
        <Item>더빙 연습</Item>  
        <Item>발음 연습</Item>  
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