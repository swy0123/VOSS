import { styled } from "styled-components";
import MessengerIcon from "../../assets/Messenger/messengerIcon.png"
import MessageList from "./MessageList";
import { useState } from "react";

const MessegeDiv = styled.div`
    position: fixed;
    right: 30px;
    bottom: 30px;
`;

const MessageIcon = styled.img`
    width: 60px;
    height: 60px;
`;

const Messenger = () =>{
    const [showMessage, setShowMessage] = useState<boolean>(false);

    const handleMessageField = () => {
        if(showMessage) setShowMessage(false);
        else setShowMessage(true);
      };

    return(
        <MessegeDiv>
            {showMessage ? <MessageList handleMessageField={handleMessageField}></MessageList>
            : <MessageIcon src={MessengerIcon}  onClick={handleMessageField}/>}
        </MessegeDiv>

    )

}

export default Messenger;