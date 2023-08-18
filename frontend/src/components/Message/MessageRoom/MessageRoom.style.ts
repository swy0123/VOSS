import { styled } from "styled-components";

export const MessegeListDiv = styled.div`
  z-index: 300;
  width: 300px;
  height: 400px;
  border-color: #D2D2D2;
  border-radius: 15px;
  border-style: solid;
  border: 1px;
  background-color: white;
  position: fixed;
  right: 25px;
  bottom: 25px;
  opacity: 97%;
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MessegeTitle = styled.div`
  font-size: 14px;
  font-weight: bolder;
  margin-top: 10px;
  margin-left: 10px;
  `;

export const ExitImg = styled.img`
  cursor: pointer;
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
  /* border: 5px red solid; */
  height: 300px;
  width: 95%;
  margin: 1px auto;
  padding: 0 5px;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(186, 186, 186, 1); /* 스크롤바의 색상 */
    border-radius: 10px;
  }
`;

export const Chatting = styled.div`
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  border-color: #d9d9d9;
  background-color: white;
  font-size: 12px;
  height: fit-content;
  max-width: 70%;
  padding: 7px;
  margin: 4px;
  word-wrap: break-word;
`;

export const MyChatting = styled.div`
  display: flex;
  justify-content: end;
`;
export const OtherChatting = styled.div`
  display: flex;
  justify-content: start;
`;

export const ChattingDate = styled.div`
  font-size: 5px;
  position: relative;
  margin-top: auto;
  margin-bottom: 7px;
  opacity: 0.5;
`;

export const Input = styled.input`
  background-color: #d9d9d9;
  width: 75%;
  margin: 11px;
  padding: 7px;
  border-radius: 5px;
  border: none;
  text-decoration: none;
  outline: none;
`;

export const Send = styled.img`
  cursor: pointer;
  position: absolute;
  right: 11px;
  bottom: 14px;
  width: 32px;
  height: 30px;
`;