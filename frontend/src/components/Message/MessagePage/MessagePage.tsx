import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png"
import AddMessage from "/src/assets/Messenger/AddMessage.png";
import AddMessageHover from "/src/assets/Messenger/AddMessageHover.png";
import RedDot from "/src/assets/Messenger/RedDot.png";
import MessageModal from "../MessageModal/MessageModal";
import MessageRoom from "../MessageRoom/MessageRoom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { getMessageRooms, getMessages } from "/src/api/messenger";
import { RoomType, MessageType } from "/src/type/Auth";
import { ShowMessengerState, ShowMessageRoomState, ShowFindFriendState, RoomsState, CurrentRoomState, MessagesState, MessengerAlarmState, LiveRoomsState } from "/src/recoil/Messenger";
import { MessegePageDiv, MessegeTitle, ExitImg, MessegeBodyDiv, MessegeList, MessageChecked, MessageTitle, MessageCardDiv, MessageAdd, } from "./MessagePage.style"


const MessagePage = () => {
  const [isOpenMessenger, setOpenMessenger] = useRecoilState<boolean>(ShowMessengerState);
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
  const [rooms, setRooms] = useRecoilState(RoomsState);
  const [messages, setMessages] = useRecoilState<MessageType[]>(MessagesState);
  const [currentRoom, setCurrentRoom] = useRecoilState<RoomType>(CurrentRoomState);
  const [addBtnHover, setAddBtnHover] = useState(false);
  const [exitBtnHover, setExitBtnHover] = useState(false);
  const [isAlarm, setIsAlarm] = useRecoilState(MessengerAlarmState); 
  const [liveRooms, setLiveRooms] = useRecoilState<number[]>(LiveRoomsState); 

  const goToRoom = (room: RoomType) => {
    getMessages(room.chatId, 0, 20).then((dataMessages) => {
      if (dataMessages) {
        const reverse = dataMessages.content.reverse();
        setMessages(reverse);
        setCurrentRoom(room);
        setOpenModal(false);
        setOpenRoom(true);
        setLiveRooms((prev) => prev.filter(chatId => chatId !== room.chatId))
      }
    })
  };

  useEffect(() => {
    setIsAlarm(false);
    
    getMessageRooms().then((dataRooms) => {
      if (dataRooms) {
        setRooms(dataRooms)
      };
    });
  }, [rooms.length, isOpenRoom]);

  return (
    <MessegePageDiv>

      <MessegeTitle>채팅목록 ({rooms.length})</MessegeTitle>
      <ExitImg 
        src={exitBtnHover ? ExitBoxHover : ExitBox}
        onClick={()=>setOpenMessenger(false)}
        onMouseEnter={() => setExitBtnHover(true)}
        onMouseLeave={() => setExitBtnHover(false)}
      />
      <hr />

      <MessegeBodyDiv>
        <MessegeList>
          {rooms.map((room: RoomType, index: number) => (
            <div key={index} onClick={() => goToRoom(room)}>
              
            <MessageCardDiv key={index} onClick={() => goToRoom(room)}>
            <MessageTitle>{room.name}</MessageTitle>
              { room.unReadMessage || liveRooms.includes(room.chatId)
              ? <MessageChecked src={RedDot}/>
              : null
              }
            </MessageCardDiv>

            </div>
          ))}
          { rooms.length === 0
          ? <div style={{ textAlign: "center", marginTop: "150px" }}>채팅방이 없습니다</div>
          : null
          }
        </MessegeList>
      </MessegeBodyDiv>

      <MessageAdd 
        src={addBtnHover ? AddMessageHover : AddMessage} 
        onClick={()=>setOpenModal(true)}
        onMouseEnter={() => setAddBtnHover(true)}
        onMouseLeave={() => setAddBtnHover(false)}/>

      { isOpenModal ? <MessageModal /> : null}
      { isOpenRoom ? <MessageRoom/> : null }

    </MessegePageDiv>
  );
};

export default MessagePage;