import { styled } from "styled-components";

export const MessegeListDiv = styled.div`
  z-index: 300;
  width: 300px;
  height: 400px;
  border-color: D2D2D2;
  border-radius: 15px;
  border-style: solid;
  border: 1px;
  background-color: #efefef;
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
  /* -ms-overflow-style: none;
    &::-webkit-scrollbar {
    display: none;
} */
`;

export const Chatting = styled.div`
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #d9d9d9;
  background-color: white;
  font-size: 11px;
  height: fit-content;
  max-width: 70%;
  padding: 7px;
  margin: 3px;
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
  background-color: #d9d9d9;
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
