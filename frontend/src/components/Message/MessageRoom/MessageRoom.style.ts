import { styled } from "styled-components";

export const MessegeListDiv = styled.div`
  z-index: 300;
  width: 300px;
  height: 400px;
  border-color: D2D2D2;
  border-radius: 15px;
  border-style: solid;
  border: 1px;
  background-color: white;
  position: fixed;
  right: 25px;
  bottom: 25px;
  opacity: 97%;
  `;

export const MessegeTitle = styled.div`
  font-size: 14px;
  font-weight: bolder;
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

export const InfinityScroll = styled.div`
  height: 300px;
  width: 90%;
  margin: 1px auto;
  position: relative;
  
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 4px;
    border-radius: 6px;
    background: rgba(186, 186, 186, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  `;

export const Chatting = styled.div`
  border-radius: 10px;
  border: solid 1.3px #efefef;
  background-color: #efefef;
  font-size: 11px;
  height: fit-content;
  max-width: 70%;
  padding: 7px;
  margin: 3px;
  /* border: solid 3px blueviolet; */
  `;

export const MyChatting = styled.div`
  display: flex;
  justify-content: end;
  `;
export const OtherChatting = styled.div`
  display: flex;
  justify-content: start;
  `;

export const Date = styled.div`
  font-size: 5px;
  position: relative;
  margin-top: auto;
  margin-bottom: 7px;
`;

export const Input = styled.input`
  background-color: #efefef;
  width: 75%;
  margin: 11px;
  padding: 7px;
  border-radius: 5px;
  border-width: 0px;
`;

export const Send = styled.img`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
