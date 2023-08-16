import { styled } from "styled-components";

export const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 15;
`;

export const Chat = styled.div`
  background-color: #3F3F3F;
  height: 98%;
  width: 100%;
  background-color: rgb(70, 70, 70, 0.9);
  position: relative;
  border-radius: 10px;
  padding-top: 2%;
  z-index: 15;
`;

export const ChatScroll = styled.div`
  height: 90%;
  width: 95%;
  margin: 1px auto;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;
// export const ChatScroll = styled.div<{$bottomOn:boolean}>`
//   height: ${(props) =>
//     props.$bottomOn ? "80%"
//       : "90%"};
//   width: 95%;
//   margin: 1px auto;
//   position: relative;
//   overflow-y: scroll;
//   overflow-x: hidden;
//   &::-webkit-scrollbar {
//     width: 4px;
//   }
//   &::-webkit-scrollbar-thumb {
//     border-radius: 2px;
//     background: #ccc;
//   }
// `;

export const Chatting = styled.div`
  font-size: 12px;
  margin-top: 5px;
  white-space:normal;
`;

// export const MyChatting = styled.div`
//   display: flex;
//   justify-content: end;
// `;


export const ChattingDetail = styled.div`
  justify-content: start;
  margin-bottom: 25px;
  margin-left: 15px;
`;

export const ChattingLabel = styled.div`
  display: flex;
  padding-top: 5px;
  align-items: flex-start;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  .msg-sender {
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF; 
  }

  .msg-datetime {
    font-size: 14px;
    color: #9C9C9C;
  }
`;

export const MessageInput = styled.div`
  height: 70px;
  width: 100%;
  // background-color: red;
  position: relative;
  bottom: 0;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
`;
// export const MessageInput = styled.div<{$bottomOn:boolean}>`
//   height: ${(props) =>
//     props.$bottomOn ? "20%"
//       : "40px"};
//   width: 100%;
//   // background-color: red;
//   position: relative;
//   bottom: 0;
//   box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
// `;

export const StyledInput = styled.input`
  all: unset;
  width: 90%;
  height: 100%;
  padding: auto;
  padding-left: 20px;
  font-size: 16px;
  white-space:normal;
`;