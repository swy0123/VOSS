import { styled } from "styled-components";

export const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Chat = styled.div`
  background-color: #3F3F3F;
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 10px;
  padding-top: 15px;
`;

export const ChatScroll = styled.div`
  height: 80%;
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

export const Chatting = styled.div`
  font-size: 12px;
  margin-top: 5px;
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
  max-height: 20%;
  height: 50px;
  width: 100%;
  // background-color: red;
  position: relative;
  bottom: 0;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledInput = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
  padding: auto;
  padding-left: 20px;
  font-size: 16px;
`;