import { useEffect, useRef } from "react";
import MessagePage from "./MessagePage/MessagePage";
import { getMessageRooms } from "/src/api/messenger";
import { useRecoilState, useRecoilValue } from "recoil";
import { ShowMessengerState, MessengerAlarmState, RoomsState, LiveRoomsState } from "/src/recoil/Messenger";
import { CurrentUserAtom, LoginState } from "/src/recoil/Auth";
import { RoomType } from "/src/type/Auth";
import MessengerIcon from "/src/assets/Messenger/MessengerIcon.png"
import RedDot from "/src/assets/Messenger/RedDot.png";
import { MessegeDiv, MessageIcon, MessageChecked } from "./Messenger.style"

const WebSocket_URL = 'wss:/i9b106.p.ssafy.io:8080/ws/messenger';

const Messenger = () =>{
  const me = useRecoilValue(CurrentUserAtom).userid;
  const [isOpenMessenger, setOpenMessenger] = useRecoilState<boolean>(ShowMessengerState);
  const initRef = useRef<WebSocket | null>(null);
  const isLogin = useRecoilValue(LoginState);
  const [isAlarm, setIsAlarm] = useRecoilState(MessengerAlarmState);
  const [liveRooms, setLiveRooms] = useRecoilState<number[]>(LiveRoomsState);
  const [rooms, setRooms] = useRecoilState(RoomsState);
  const sendEnterMessage = () => {
    const enterMessage = {
      chatId: 1,
      sessionId: "init",
      memberId: 0,
      content: "enter",
    };
    if (initRef.current) {
      // console.log("init socket enter")
      initRef.current.send(JSON.stringify(enterMessage));
    };
  };
    
  const sendLeaveMessage = () => {
    const leaveMessage = {
        chatId: 1,
        sessionId: "init",
        memberId: me,
        content: "leave",
      };
    if (initRef.current) {
    initRef.current.send(JSON.stringify(leaveMessage));
    initRef.current.close();
    };
  };
  
  useEffect(() => {
    // console.log("init socket mounted")

    getMessageRooms().then((dataRooms: RoomType[]) => {
      if (dataRooms) {
        if (dataRooms.some((room) => room.unReadMessage)) {
          setIsAlarm(true)
        }
      }
    })
  
    if (!initRef.current) {
      const wss = new WebSocket(WebSocket_URL);
      
      wss.onopen = () => { 
        initRef.current = wss; 
        // console.log("init socket open")
        sendEnterMessage();
      };
    
      wss.onmessage = (event) => {
        let recieveMessage = JSON.parse(event.data);
        // console.log("memberId: ", recieveMessage.memberId, "userId: ", me, "recieveMessage: ", recieveMessage);
        if ( recieveMessage.memberId == me && recieveMessage.sessionId == "init") {
          setIsAlarm(true)
          const roomId = recieveMessage.chatId;
          console.log("roomId: ", roomId)
          if (!liveRooms.includes(roomId)) {
            setLiveRooms(prev => [...prev, roomId]);
          }
          const roomIndex = rooms.findIndex((room: RoomType) => room.chatId === roomId);
          console.log("roomIndex: ", roomIndex)
          if (roomIndex === -1) {
            getMessageRooms().then((dataRooms) => {
              if (dataRooms) { setRooms(dataRooms) }
            })
          } else {
            setRooms([rooms[roomIndex], ...rooms.slice(0, roomIndex), ...rooms.slice(roomIndex + 1)]);
          }
        };
      };

      wss.onclose = () => {
        sendLeaveMessage();
        // console.log("init socket close")
        if (isLogin) {
          const wss = new WebSocket(WebSocket_URL);
          wss.onopen = () => { 
            initRef.current = wss; 
            // console.log("init socket open") 
            sendEnterMessage();
          };
        };
      };
    };

    return () => {
      if (initRef.current && !isLogin) {
          sendLeaveMessage();
          // console.log("init socket close");
      } else {
        // console.log("init socket unmounted");
      }
    };

  }, []);

  return(
      <MessegeDiv>
          {isOpenMessenger
          ? <MessagePage/>
          : <MessageIcon src={MessengerIcon} onClick={()=>{setOpenMessenger(true); setIsAlarm(false)}}/>
          }

          { isAlarm ? <MessageChecked src={RedDot}/> : null }
      </MessegeDiv>
  );
};

export default Messenger;