import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MessageType, RoomType } from "/src/type/Auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { ShowMessageRoomState, CurrentRoomState, MessagesState } from "/src/recoil/Messenger";
import { CurrentUserAtom } from "/src/recoil/Auth";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import Arrow from "/src/assets/Messenger/SendArrow.png";
import ArrowHover from "/src/assets/Messenger/SendArrowHover.png";
import { 
  MessegeListDiv, 
  MessegeTitle, 
  ExitImg, 
  MessegeBodyDiv, 
  InfinityScroll, 
  Chatting, 
  MyChatting, 
  OtherChatting, 
  ChattingDate, 
  Input, 
  Send, } from "./MessageRoom.style"

  const WebSocket_URL = 'wss:/i9b106.p.ssafy.io:8080/ws/messenger'
  
  const MessageRoom = () => {
    const me = useRecoilValue(CurrentUserAtom).userid;
    const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
    const [currentRoom, setCurrentRoom] = useRecoilState<RoomType>(CurrentRoomState);
    const [messages, setMessages] = useRecoilState<MessageType[]>(MessagesState);
    const [message, setMessage] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);
    const [exitBtnHover, setExitBtnHover] = useState(false);
    const [sendHover, setSendHover] = useState(false);
    const [firstRender, setFirstRender] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [unReadIndex, setUnReadIndex] = useState<number>(-1);
    const navigate = useNavigate();
    const goProfile = (memberId: number) => (navigate(`/profile/${memberId}`));

    const sendMessage = () => {
      if (message.trim() !== "") {
        const sentMessage = {
          chatId: currentRoom.chatId,
          sessionId: currentRoom.sessionId,
          memberId: me,
          content: message,
        };
        const sentAlarm = {
          chatId: currentRoom.chatId,
          sessionId: "init",
          memberId: currentRoom.memberId,
          content: "Alarm",
        };
        if (socketRef.current) {
          socketRef.current.send(JSON.stringify(sentMessage));
          socketRef.current.send(JSON.stringify(sentAlarm));
          setMessage("");
        }
      }
    };
  
  const sendEnterMessage = () => {
    const enterMessage = {
      chatId: currentRoom.chatId,
      sessionId: currentRoom.sessionId,
      memberId: me,
      content: "enter",
    };
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(enterMessage));
    };
  };
  
  const sendLeaveMessage = () => {
    const leaveMessage = {
      chatId: currentRoom.chatId,
      sessionId: currentRoom.sessionId,
      memberId: me,
      content: "leave",
    };
    if (socketRef.current) {
    socketRef.current.send(JSON.stringify(leaveMessage));
    socketRef.current.close();
    };
  };

  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const scrollToMessage = () => {
    setFirstRender(true)
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      const unreadMessages = messages.filter(message => message.time > currentRoom.lastLeaveTime);
      if (unreadMessages.length > 0) {
        setUnReadIndex(20-unreadMessages.length)
        chatContainer.scrollTop = chatContainer.scrollHeight
        chatContainer.scrollTo(0, chatContainer.scrollTop - (unreadMessages.length-1) * 37)
      } else {
        scrollToBottom();
      }
    }
  };


useEffect(() => {
  setUnReadIndex(-1);
  scrollToMessage();
  // console.log("messageRoom mounted")
  
  if (!socketRef.current) {
    const ws = new WebSocket(WebSocket_URL);
    // const ws = new WebSocket(`wss:/localhost:8080/ws/messenger`);
    
    ws.onopen = () => { 
      socketRef.current = ws; 
      // console.log("websocket open")
      sendEnterMessage();
    };
    
    ws.onmessage = (event) => {
      let recieveMessage = JSON.parse(event.data);
        // console.log("memberId: ", recieveMessage.memberId, "userId: ", me, "recieveMessage: ", recieveMessage);

        if (recieveMessage.sessionId != "init") {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
        }
      };

      ws.onclose = () => {
        sendLeaveMessage();
        // console.log("websocket close")
        if (isOpenRoom) {
          const ws = new WebSocket(WebSocket_URL);
          ws.onopen = () => { 
            socketRef.current = ws; 
            // console.log("websocket open")
            sendEnterMessage();
          };
        };
      };
    };

    return () => {
      if (socketRef.current) {
        sendLeaveMessage();
        // console.log("websocket close if");
        if (isOpenRoom) {
          const ws = new WebSocket(WebSocket_URL);
          ws.onopen = () => { 
            socketRef.current = ws; 
            // console.log("websocket open")
            sendEnterMessage();
          };
        };
      } else {
        // console.log("websocket close else");
      }
    };

  }, []);


  useEffect(() => {
    if (firstRender) {
      scrollToBottom();
    }
  }, [messages])


  return (
    <MessegeListDiv>

      <div>
        <MessegeTitle><span onClick={()=>goProfile(currentRoom.memberId)}>{currentRoom.name}</span></MessegeTitle>
        <ExitImg
            src={exitBtnHover ? ExitBoxHover : ExitBox}
            onClickCapture={()=>setOpenRoom(false)}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
        /><hr />
      </div>

      <InfinityScroll
      ref={chatContainerRef}
      id="chat-container" // 이 부분을 추가해줍니다.
      style={{ position: "relative" }}
        >
        {messages.map((message: MessageType, index: number) =>
          message.memberId === me
          ? <div key={index}>
              <MyChatting>
                <ChattingDate>{message.time?.slice(5, 10)} {message.time?.slice(11, 16)}</ChattingDate>
                <Chatting> {message.content}</Chatting>
              </MyChatting>
            </div>
          : <div key={index}>
              { unReadIndex === index
              ? <p style={{ fontSize: '10px', textAlign: 'center', width: '100%'}}>- 여기까지 읽었습니다 -</p>
              : null
              }
              <OtherChatting>
                <Chatting style={{backgroundColor: '#efefef', borderColor: '#efefef'}}> {message.content}</Chatting>
                <ChattingDate>{message.time?.slice(5, 10)} {message.time?.slice(11, 16)}</ChattingDate>
              </OtherChatting>
            </div>
        )}
      </InfinityScroll>

      <MessegeBodyDiv>
        <form onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}> 
          <Input 
          type="text" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => { if (e.target.value.length < 100) {setMessage(e.target.value)}}}
          value={message}
          />
          <Send
          src={ sendHover ? ArrowHover : Arrow}
          onMouseEnter={() => setSendHover(true)}
          onMouseLeave={() => setSendHover(false)}
          onClick={sendMessage}/>
        </form>
      </MessegeBodyDiv>

    </MessegeListDiv>
  );
};

export default MessageRoom;