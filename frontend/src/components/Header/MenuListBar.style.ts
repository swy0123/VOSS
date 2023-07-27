import { styled } from "styled-components";


export const MenuBox = styled.div`
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
export const Menuitems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
export const Item = styled.div`
  color  : white;
  font-size: 11px;
  margin: 9px auto;
  cursor: pointer;
`