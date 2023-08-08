import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";
import { useInView } from "react-intersection-observer";
import { getMessages } from "/src/api/messenger";
import { RoomType, MessageType, CurrentRoomType } from "/src/type/Auth";
import { useRecoilState } from "recoil";
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


const MessageRoom = () => {
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom);  
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [currentRoom, setCurrentRoom] = useRecoilState<CurrentRoomType>(CurrentRoomState);
  const [messages, setMessages] = useRecoilState<MessageType[]>(MessagesState);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [exitBtnHover, setExitBtnHover] = useState(false);
  const [sendHover, setSendHover] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotlaPages] = useState(0);

  useEffect(() => {
    // getMessages(currentRoom.chatId, 0, 20).then((dataMessages) => {
    //   if (dataMessages) {setMessages(dataMessages.content)}
    // })

    console.log("qqqqqqqqqqqqqqqqqqqqqqqqq")
    // 웹소캣 연결을 수행합니다.
    const ws = new WebSocket(`wss:/i9b106.p.ssafy.io:8080/ws/messenger`);

    ws.onopen = () => {
      setSocket(ws);
    }
      // console.log("websocket open")

      // 서버로부터 메시지를 수신할 때의 처리를 등록합니다.
    ws.onmessage = (event) => {
      
      console.log("event.data: ", event.data);
      console.log(12312321232);
    };

    // return () => {
    //   if (socket) {
    //     socket.close();
    //     // console.log("websocket close")
    //   }
    // };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      
      const sentMessage = {
        chatId: currentRoom.chatId,
        sessionId: currentRoom.sessionId,
        memberId: currentUser.userid,
        content: message,
      };

      // const sentAlarm = {
      //   chatId: 1,
      //   sessionId: "init",
      //   memberId: currentRoom.memberId,
      //   content: "Alarm",
      // };
      
      socket.send(JSON.stringify(sentMessage));
      // socket.send(JSON.stringify(sentAlarm));
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      setMessage("");
    }
  };

  // const startRef = useRef<HTMLDivElement>(null);
  // const instantMove = () => {
  //   startRef.current?.scrollIntoView({ behavior: "instant" });
  // };

  // useEffect(() => {
  //   setPosts([...messageLog]);
  // }, []);

  // useEffect(() => {
  //   instantMove();
  // }, [posts]);

  // const fetch = useCallback(async () => {
  //     try {
  //         const { data } = await axios.get<Post[]>(
  //             `http://localhost:5000/posts?_limit=10&_page=${page.current}`
  //         );
  //         setPosts((prevPosts) => [...prevPosts, ...data]);
  //         setHasNextPage(data.length === 10);
  //         if (data.length) {
  //             page.current += 1;
  //         }
  //     } catch (err) {
  //         console.error(err);
  //     }
  // }, []);

  // useEffect(() => {
  //     console.log(inView, hasNextPage);
  //     if (inView && hasNextPage) {
  //         fetch();
  //     }
  // }, [fetch, hasNextPage, inView]);

  return (
    <MessegeListDiv>

      <div>
        <MessegeTitle>{currentRoom.name}</MessegeTitle>
        <ExitImg
            src={exitBtnHover ? ExitBoxHover : ExitBox}
            onClickCapture={()=>setOpenRoom(false)}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
        /><hr />
      </div>

      <InfinityScroll style={{ position: "relative" }}>
        {messages.map((message: MessageType, index: number) =>
          message.memberId === currentUser.userid
          ? (
            <div key={index}>
              <MyChatting>
                <ChattingDate>{message.time}</ChattingDate>
                <Chatting> {message.content}</Chatting>
              </MyChatting>
            </div>
          ) : (
            <div key={index}>
              <OtherChatting>
                <Chatting> {message.content}</Chatting>
                <ChattingDate>{message.time}</ChattingDate>
              </OtherChatting>
            </div>
          )
        )}

        {/* <div ref={startRef}></div> */}
      </InfinityScroll>

      <MessegeBodyDiv>
        <div>
          <Input 
          className="input"
          type="text" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} 
          value={message}/>
          <Send
          style={{ width: '30px', height: '30px' }}
          src={ sendHover ? ArrowHover :Arrow}
          onMouseEnter={() => setSendHover(true)}
          onMouseLeave={() => setSendHover(false)}
          onClick={sendMessage}/>
        </div>
      </MessegeBodyDiv>

    </MessegeListDiv>
  );
};

export default MessageRoom;
