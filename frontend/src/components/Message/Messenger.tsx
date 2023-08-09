import MessengerIcon from "/src/assets/Messenger/MessengerIcon.png"
import MessagePage from "./MessagePage/MessagePage";
import { useRecoilState, useRecoilValue } from "recoil";
import { ShowMessengerState, MessengerAlarmState } from "/src/recoil/Messenger";
import { CurrentUserAtom, LoginState } from "/src/recoil/Auth";
import { MessegeDiv, MessageIcon } from "./Messenger.style"
import { useEffect, useRef } from "react";

const WebSocket_URL = 'wss:/i9b106.p.ssafy.io:8080/ws/messenger';

const Messenger = () =>{
    const me = useRecoilValue(CurrentUserAtom).userid;
    const [isOpenMessenger, setOpenMessenger] = useRecoilState<boolean>(ShowMessengerState);
    const initRef = useRef<WebSocket | null>(null);
    const isLogin = useRecoilValue(LoginState);
    const [isAlarm, setIsAlarm] = useRecoilState(MessengerAlarmState);
  
    const sendMessage = () => {

        // const sentMessage = {
        //   chatId: currentRoom.chatId,a
        //   memberId: currentUser.userid,
        //   content: message,
        // };
        // if (initRef.current) {
        //   initRef.current.send(JSON.stringify(sentMessage));
        //   initRef.current.send(JSON.stringify(sentAlarm));
        //   setMessage("");
        //     }
        }
  
    // const sendEnterMessage = () => {
    //   const enterMessage = {
    //     chatId: 1,
    //     sessionId: "init",
    //     memberId: 0,
    //     content: "enter",
    //   };
    //   if (initRef.current) {
    //     console.log("messenger socket enter")
    //     initRef.current.send(JSON.stringify(enterMessage));
    //   };
    // };
    
    // const sendLeaveMessage = () => {
    //   const leaveMessage = {
    //       chatId: 1,
    //       sessionId: "init",
    //       memberId: me,
    //       content: "leave",
    //     };
    //   if (initRef.current) {
    //   initRef.current.send(JSON.stringify(leaveMessage));
    //   initRef.current.close();
    //   };
    // };
  
    // useEffect(() => {
    //   console.log("messenger socket mounted")
      
    //   if (!initRef.current) {
    //     const wss = new WebSocket(WebSocket_URL);
        
    //     wss.onopen = () => { 
    //       initRef.current = wss; 
    //       console.log("messenger socket open")
    //       sendEnterMessage();
    //     };
      
    //     wss.onmessage = (event) => {
    //       let recieveMessage = JSON.parse(event.data);
    //       console.log("memberId: ", recieveMessage.memberId, "userId: ", me, "recieveMessage: ", recieveMessage);
  
    //       if (recieveMessage.sessionId == "init") {
    //         setIsAlarm(true);
    //         console.log("background Alram!")
    //       }
    //     };
  
    //     wss.onclose = () => {
    //       console.log("messenger socket close")
    //       if (isLogin) {
    //         const wss = new WebSocket(WebSocket_URL);
    //         wss.onopen = () => { 
    //           initRef.current = wss; 
    //           console.log("messenger socket open")
    //           sendEnterMessage();
    //         };
    //       };
    //     };
    //   };
  
    //   return () => {
    //     if (initRef.current) {
    //     //   sendLeaveMessage();
    //       console.log("messenger socket close if");
    //     } else {
    //       console.log("messenger socket close else");
    //     }
    //   };
  
    // }, []);



    return(
        <MessegeDiv>
            {isOpenMessenger
            ? <MessagePage />
            : <MessageIcon src={MessengerIcon} onClick={()=>setOpenMessenger(true)}/>}
        </MessegeDiv>
    );
};

export default Messenger;