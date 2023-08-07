import { styled } from "styled-components";

export const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Chat = styled.div`
  background-color: #b8b8b8;
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 10px;
`;

export const ChatScroll = styled.div`
  height: 95%;
  width: 95%;
  margin: 1px auto;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Chatting = styled.div`
  font-size: 11px;
  padding: 7px;
  margin: 3px;
`;

export const MyChatting = styled.div`
  display: flex;
  justify-content: end;
`;

export const MessageInput = styled.div`
  height: 5%;
  width: 100%;
`;

export const OtherChatting = styled.div`
  display: flex;
  justify-content: start;
`;
