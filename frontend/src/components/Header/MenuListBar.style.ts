import { styled } from "styled-components";


export const MenuBox = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  background-color: rgb(0,0,0,0.8);
  border-radius: 0px 0px 5px 5px;
  border-top: 0.25px solid grey;
  height: 120px;
  width: 368px;
  margin-left: 172px;
  z-index: 1;
  top: 65px;
`
export const Menuitems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
export const Item = styled.div`
  color  : white;
  font-size: 14px;
  margin: 9px auto;
  cursor: pointer;
`