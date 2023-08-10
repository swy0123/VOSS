import { styled } from "styled-components";

export const MessegePageDiv = styled.div`
  width: 300px;
  height: 400px;
  border-color: #D2D2D2;
  border-radius: 15px;
  border-style: solid;
  border: 1px;
  /* border: solid 10px green; */
  background-color: #efefef;
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 100;
  `;

export const MessegeTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
  `;

export const ExitImg = styled.img`
  position: absolute;
  right: 10px;
  top: 9px;
  width: 20px;
  height: 20px;
  `;

export const MessegeBodyDiv = styled.div`
  margin: 0 auto;
  `;

export const MessegeList = styled.div`
  height: 340px;
  position: relative;
  top: -9px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100%);
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  `;

export const MessageAdd = styled.img`
  position: absolute;
  right: 10px;
  bottom: 9px;
  width: 30px;
  height: 30px;
  &:hover{
    background-color: rgba(255, 255, 255, 0.5)
  }
`;
