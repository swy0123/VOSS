import MessengerIcon from "/src/assets/Messenger/MessengerIcon.png"
import MessagePage from "./MessagePage/MessagePage";
import { useRecoilState } from "recoil";
import { ShowMessengerState, ShowFindFriendState, ShowMessageRoomState } from "/src/recoil/Messenger";
import { MessegeDiv, MessageIcon } from "./Messenger.style"
import { useEffect } from "react";


const Messenger = () =>{
    const [isOpenMessenger, setOpenMessenger] = useRecoilState<boolean>(ShowMessengerState);
    const [, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
    const [, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);

    return(
        <MessegeDiv>
            {isOpenMessenger
            ? <MessagePage />
            : <MessageIcon src={MessengerIcon} onClick={()=>setOpenMessenger(true)}/>}
        </MessegeDiv>
    );
};

export default Messenger;