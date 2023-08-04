import React, { ChangeEvent, KeyboardEvent, useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { ChatContainer, Chat, ChatScroll, MyChatting, OtherChatting, Chatting } from "./ChatComponent.style";

// import './ChatComponent.css';

export interface ChatProps {
  connectionIdProps: string;
  nicknameProps: string;
  streamManagerProps: any;
  chatDisplayProps: string;
  close: (property: string | undefined) => void;
  messageReceived: () => void;
}

interface messageType {
  connectionId: string;
  nickname: string;
  message: string;
}

const ChatComponent = ({ chatProps }: { chatProps: ChatProps }) => {
  const [messageList, setMessageList] = useState<messageType[]>([]);
  const [message, setMessage] = useState("");
  const chatScroll = useRef<HTMLDivElement>(null);

  const [chatDisplay, setChatDisplay] = useState(chatProps.chatDisplayProps);
  const [connectionId, setConnectionId] = useState(chatProps.connectionIdProps);
  const [nickname, setNickname] = useState(chatProps.nicknameProps);
  const [streamManager, setStreamManager] = useState<any>(chatProps.streamManagerProps);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handlePressKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    // console.log(message);
    if (message) {
      let newMessage = message.replace(/ +(?= )/g, "");
      if (newMessage !== "" && newMessage !== " ") {
        const data = {
          message: newMessage,
          nickname: nickname,
          streamId: streamManager.stream.streamId,
        };
        streamManager.stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    setMessage("");
  };

  const scrollToBottom = () => {
    chatScroll.current?.scrollIntoView({ behavior: "instant" });
  };

  const close = () => {
    chatProps.close(undefined);
  };

  useEffect(() => {
    streamManager.stream.session.on("signal:chat", (event: any) => {
      const data = JSON.parse(event.data);
      let updatedMessageList = [...messageList];
      updatedMessageList.push({
        connectionId: connectionId,
        nickname: data.nickname,
        message: data.message,
      });
      // if (data.message !== undefined && data.message === "hello" ) console.log(data.message+"in")
      const document = window.document;
      setTimeout(() => {
        // const userImg = document.getElementById("userImg-" + (updatedMessageList.length - 1));
        const video = document.getElementById("video-" + data.streamId);
        // const avatar = userImg.getContext('2d');
        // avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
        // chatProps.messageReceived();
      }, 50);
      setMessageList(updatedMessageList);
      scrollToBottom();

    });
    if (messageList.length - 1 > 0 && messageList[messageList.length - 1].message === "hello") {
      alert(messageList[messageList.length - 1].message + "  check");
    }

    // return () => {
    //   if (messageList.length-1>0 && messageList[messageList.length-1].message === "hello" ) alert(messageList[messageList.length-1].message + "ret2222");
    // }
  }, [messageList, chatProps]);

  const styleChat = { display: chatDisplay };

  return (
    <ChatContainer>
      <Chat>
        {/* <div id="chatToolbar">
          <span>{streamManager.stream.session.sessionId} - CHAT</span>
          <div id="closeButton" onClick={close}>
            <div color="secondary" />
          </div>
        </div> */}
        <ChatScroll className="message-wrap">
          {messageList.map((data, i) => data.connectionId !== connectionId ? (
            <div key={i}>
              {/* <canvas id={"userImg-" + i}className="user-img" /> */}
              <MyChatting className="msg-detail">
                <div className="msg-info">
                  nickname : {data.nickname}
                </div>
                <Chatting className="msg-content">
                  {/* <span className="triangle" /> */}
                  message : {data.message}
                </Chatting>
              </MyChatting>
            </div>
          ) : <div key={i}>
            <OtherChatting className="msg-detail">
              <div className="msg-info">
                nickname : {data.nickname}
              </div>
              <Chatting className="msg-content">
                {/* <span className="triangle" /> */}
                message : {data.message}
              </Chatting>
            </OtherChatting>
          </div>
          )}
          <div ref={chatScroll}></div>
        </ChatScroll>

        <div id="messageInput">
          <input
            placeholder="Send a message"
            id="chatInput"
            value={message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
          />
          <div title="Send message">
            <div id="sendButton" onClick={sendMessage}>
              <div />
            </div>
          </div>
        </div>
      </Chat>
    </ChatContainer>
  );
};

export default ChatComponent;
