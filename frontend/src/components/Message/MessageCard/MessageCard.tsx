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
      <MessageTitle>{room.member}</MessageTitle>
      {/* <MessageChecked><img src={RedDot} alt="isRead"/></MessageChecked> */}
      <MessageChecked src={RedDot}/>
    </MessageCardDiv>
  );
};
export default MessageCard;
