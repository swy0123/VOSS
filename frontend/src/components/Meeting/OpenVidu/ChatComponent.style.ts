import { styled } from "styled-components";

export const ChatContainer = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

export const Chat = styled.div`
  background-color: #b8b8b8;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 99999;
  border-radius: 10px;
`;


export const ChatScroll = styled.div`
  height: 90%;
  width: 100%;
  margin: 1px auto;
  position: relative;
  overflow-y: auto;
  /* -ms-overflow-style: none;
    &::-webkit-scrollbar {
    display: none;
} */
`;

export const Chatting = styled.div`
  /* border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #d9d9d9; */
  /* background-color: white; */
  font-size: 11px;
  /* height: fit-content;
  max-width: 70%; */
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

// export constchatToolbar {
//     height: 30px;
//     background-color: #3d3d3d;
//     box-sizing: border-box;
//     font-weight: bold;
//     font-size: 14px;
//     text-align: center;
//     padding-top: 4px;
//     border-top-left-radius: 6px;
//     border-top-right-radius: 6px;
//     color: #ffffff;
//   }

//   export constcloseButton {
//     position: absolute;
//     right: 0;
//     top: -8px;
//   }

//   export constchatComponent {
//     background-color: #b8b8b8;
//     position: absolute;
//     z-index: 99999;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     margin: auto;
//     height: calc(100% - 30px);
//     width: calc(100% - 30px);
//     border-radius: 20px;
//   }

//   export constmessage-wrap {
//     padding: 0 15px;
//     height: calc(100% - 80px);
//     overflow: auto;
//   }

//   export constmessage {
//     position: relative;
//     padding: 7px 0;
//   }
//   export constuser-img {
//     position: absolute;
//     border-radius: 45px;
//     width: 60px;
//     height: 60px;
//     top: 15px;
//   }

//   export constmsg-detail {
//     width: calc(100% - 65px);
//     display: inline-block;
//   }

//   export constmsg-detail p {
//     margin: 0;
//     font-size: 15px;
//   }

//   export constmsg-info p {
//     font-size: 0.8em;
//     color: #000000;
//     font-style: italic;
//   }

//   export constmsg-content {
//     position: relative;
//     margin-top: 5px;
//     border-radius: 5px;
//     padding: 8px;
//     color: #000000;
//     width: auto;
//     max-width: 80%;
//   }

//   export const span.triangle {
//     border-radius: 2px;
//     height: 8px;
//     width: 8px;
//     top: 12px;
//     display: block;
//     -webkit-transform: rotate(45deg);
//     transform: rotate(45deg);
//     position: absolute;
//   }

//   export consttext {
//     word-break: break-all;color: #000000;
//   }

//   /* Start message from other user */

//   export constmessage > .left .msg-detail .msg-info {
//     text-align: left;
//   }

//   export const message.left .msg-detail {
//     padding-left: 65px;
//   }

//   export constmessage.left .user-img {
//     left: -5px;
//     border: 1px solid #f0f0f094;
//   }

// export const message.left .msg-detail .msg-content {
//     background-color: #f0f0f0;
//     float: left;
//   }
//   export const message.left .msg-detail .msg-content span.triangle {
//     background-color: #f0f0f0;
//     border-bottom-width: 0;
//     border-left-width: 0;
//     left: -5px;
//   }

//   /* End message from other user */

//   /* Start my messages */

//   export const message.right .msg-detail .msg-info {
//     text-align: right;
//   }
//   export const message.right .user-img {
//     right: -5px;
//     border: 1px solid #c8ffe8ab;
//   }

//   export const message.right .msg-detail .msg-content {
//     background-color: #c8ffe8;
//     float: right;
//   }
//   export const message.right .msg-detail .msg-content span.triangle {
//     background-color: #c8ffe8;
//     border-bottom-width: 0;
//     border-left-width: 0;
//     right: -5px;
//   }

//   /* End my messages */

//   export const messageInput {
//     position: absolute;
//     bottom: 0px;
//     width: 100%;
//     background-color: #ffffff;
//     text-align: center;
//     padding: 10px 0px;
//     height: 30px;
//     border-bottom-left-radius: 6px;
//     border-bottom-right-radius: 6px;
//   }
//   export const messageInput input {
//     width: 90%;
//     height: 100%;
//     border: none;
//     outline: none;
//     font-size: 14px;
//     margin-left: -6%;
//     color: #000000;
//   }

//   export const sendButton {
//     background-color: #81e9b0;
//     position: absolute;
//     right: 10px;
//     top: 0;
//     bottom: 0;
//     margin: auto;
//     border: 1px solid #7ae2a9;
//     box-shadow: none !important;
//   }
//   #sendButton {
//     margin-left: 3px !important;
//     margin-bottom: 2px !important;
//   }

//   ::-webkit-scrollbar {
//     width: 8px;
//   }

//   ::-webkit-scrollbar-thumb {
//     background-color: #6b6b6b;
//   }

//   .chatComponentLight ::-webkit-scrollbar-thumb {
//     background-color: #eeeeee !important;
//   }
