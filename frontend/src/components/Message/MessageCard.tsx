import { styled } from "styled-components";
import RedDot from "../../assets/Messenger/RedDot.png";

const MessageCardDiv = styled.div`
  width: 95%;
  height: 36px;
  border: 1px;
  border-radius: 4px;
  border-color: #d2d2d2;
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

interface CardProp {
    // key: string;
    room:{name: string;
        msg: string;
        roomNum: number;};  
}

const MessageCard = (props:CardProp) => {
  return (
    <MessageCardDiv>
      <MessageTitle>
        {props.room.name}
        {props.room.msg}
        {true ? <MessageChecked src={RedDot} /> : <></>}
      </MessageTitle>
    </MessageCardDiv>
  );
};
export default MessageCard;
