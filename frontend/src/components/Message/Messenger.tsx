import React from 'react';
import { useRecoilState } from "recoil";
import { ShowMessengerState } from "/src/recoil/Messenger";
import MessengerIcon from "/src/assets/Messenger/messengerIcon.png"
import MessagePage from "./MessagePage/MessagePage";
import { MessegeDiv, MessageIcon } from "./Messenger.style"


const Messenger = () =>{
    const [isOpenMessenger, setOpenMessenger] = useRecoilState<boolean>(ShowMessengerState);

    return(
        <MessegeDiv>
            {isOpenMessenger
            ? <MessagePage />
            : <MessageIcon src={MessengerIcon} onClick={()=>setOpenMessenger(true)}/>}
        </MessegeDiv>
    );
};

export default Messenger;