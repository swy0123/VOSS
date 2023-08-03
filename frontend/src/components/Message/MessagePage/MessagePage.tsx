import ExitBox from "/src/assets/Messenger/ExitBox.png";
import AddMessage from "/src/assets/Messenger/AddMessage.png";
import AddMessageHover from "/src/assets/Messenger/AddMessageHover.png";
import MessageCard from "../MessageCard/MessageCard";
import MessageModal from "../MessageModal/MessageModal";
import MessageRoom from "../MessageRoom/MessageRoom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { getMessageRooms } from "/src/api/messenger";
import { ShowMessengerState, ShowMessageRoomState, ShowFindFriendState, RoomsState, OpenRoomIdState } from "/src/recoil/Messenger";
import { MessegePageDiv, MessegeTitle, ExitImg, MessegeBodyDiv, MessegeList, MessageAdd, } from "./MessagePage.style"


const MessagePage = () => {
  const [isOpenMessenger, setOpenMessenger] = useRecoilState<boolean>(ShowMessengerState);
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
  const [rooms, setRooms] = useRecoilState(RoomsState);
  const [openRoomId, setOpenRoomId] = useRecoilState(OpenRoomIdState);
  const [addBtnHover, setAddBtnHover] = useState(false);

  //아이디를 어케 쓸지 다시 정해야 함 현재 사람이름, 인덱스 등 뒤죽박죽임
  const goToRoom = (id: number) => {
    setOpenRoomId(id);
    setOpenRoom(true);
  };

  useEffect(() => {
    getMessageRooms().then((dataRooms) => {
      if (dataRooms) {
        setRooms(dataRooms)
      }
    })
  }, []);
  // [isOpenMessenger, isOpenModal]
  
  return (
    <MessegePageDiv>

      <MessegeTitle>채팅목록 ({rooms.length})</MessegeTitle>
      <ExitImg src={ExitBox} onClick={()=>setOpenMessenger(false)} />
      <hr />

      <MessegeBodyDiv>
        <MessegeList>
          {rooms.map((room) => (
            <div key={room.chatId} onClick={() => goToRoom(room.chatId)}>
              <MessageCard room={room} />
            </div>
          ))}
        </MessegeList>
      </MessegeBodyDiv>

      <MessageAdd 
        src={addBtnHover ? AddMessageHover : AddMessage} 
        onClick={()=>setOpenModal(true)}
        onMouseEnter={() => setAddBtnHover(true)}
        onMouseLeave={() => setAddBtnHover(false)}>
      </MessageAdd>
      { isOpenModal ? <MessageModal /> : null}
      { isOpenRoom ? <MessageRoom/> : null }

    </MessegePageDiv>
  );
};

export default MessagePage;