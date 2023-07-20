import { styled } from "styled-components";
import RedDot from "../../assets/Messenger/RedDot.png"

const MessageCardDiv = styled.div`
    width: 95%;
    border: 1px;
    border-radius: 4px;
    border-color: #D2D2D2;
    border-style: solid;
    margin: 5px auto;
`;

const MessageTitle = styled.div`
    font-size: 15px;
    margin: 3%;
`;

const MessageChecked = styled.img`
    float: right;
    margin: 5px;
    width: 8px;
`;

const MessageCard = () => {
    return (
        <MessageCardDiv>
            <MessageTitle>
                이시영
                { }
                {true ? <MessageChecked src={RedDot}/> : <></>}
            </MessageTitle>
            
            

        </MessageCardDiv>
    );
}
export default MessageCard;