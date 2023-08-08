import RedDot from "/src/assets/Messenger/RedDot.png";
import { MessageChecked, MessageTitle, MessageCardDiv } from "./MessageCard.style";
import { RoomType } from "/src/type/Auth";


const MessageCard = ({room}: {room: RoomType}) => {
  return (
    <MessageCardDiv>
      <MessageTitle>{room.name}</MessageTitle>
      {/* <MessageChecked><img src={RedDot} alt="isRead"/></MessageChecked> */}
      <MessageChecked src={RedDot}/>
    </MessageCardDiv>
  );
};
export default MessageCard;
