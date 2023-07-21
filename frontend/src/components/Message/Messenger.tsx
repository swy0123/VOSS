import { styled } from "styled-components";
import MessengerIcon from "../../assets/Messenger/messengerIcon.png"
import MessagePage from "./MessagePage";
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
            {showMessage ? <MessagePage handleMessageField={handleMessageField}></MessagePage>
            : <MessageIcon src={MessengerIcon}  onClick={handleMessageField}/>}
        </MessegeDiv>

    )

}

export default Messenger;