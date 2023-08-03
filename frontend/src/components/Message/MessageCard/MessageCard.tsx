import RedDot from "/src/assets/Messenger/RedDot.png";
import { MessageChecked, MessageTitle, MessageCardDiv } from "./MessageCard.style"


interface RoomType {
    // key: string;
    member: string;
    id: number;  
}

const MessageCard = ({room}: {room: RoomType}) => {
  return (
    <MessageCardDiv>
      <MessageTitle>
        {room.member}
        {true ? <MessageChecked src={RedDot} /> : null }
      </MessageTitle>
    </MessageCardDiv>
  );
};
export default MessageCard;
