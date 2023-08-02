import ExitBox from "/src/assets/Messenger/ExitBox.png";
import AddMessage from "/src/assets/Messenger/AddMessage.png";
import MessageCard from "../MessageCard/MessageCard";
import { useCallback, useEffect, useState } from "react";
import MessageModal from "../MessageModal/MessageModal";
import MessageRoom from "../MessageRoom/MessageRoom";
import { useRecoilState } from "recoil";
import { ShowMessengerState, ShowMessageRoomState, ShowFindFriendState, RoomListState, OpenRoomIdState } from "/src/recoil/Messenger";
import { MessegePageDiv, MessegeTitle, ExitImg, MessegeBodyDiv, MessegeList, MessageAdd, } from "./MessagePage.style"


interface Room {
  member: string;
  id: number;
};

const MessagePage = () => {
  const [isOpenMessenger, setOpenMessenger] = useRecoilState<boolean>(ShowMessengerState);
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
  const [roomList, setRoomList] = useRecoilState(RoomListState);
  const [openRoomId, setOpenRoomId] = useRecoilState(OpenRoomIdState);

  //아이디를 어케 쓸지 다시 정해야 함 현재 사람이름, 인덱스 등 뒤죽박죽임
  const onClickSetRoomId = (id: string) => {
    setOpenRoomId(id);
    setOpenRoom(true)
  };

  
  return (
    <MessegePageDiv>

      <MessegeTitle>채팅목록 ({roomList.length})</MessegeTitle>
      <ExitImg src={ExitBox} onClick={()=>setOpenMessenger(false)} />
      <hr />

      <MessegeBodyDiv>
        <MessegeList>
          {/* 모든 채팅방 목록 가져오기 때문에 테이블 가져올 때 목록이랑 내용 분리해서 구현해야될 듯 */}
          {roomList.map((room) => (
            <div key={room.id} onClick={() => onClickSetRoomId(room.member)}>
              <MessageCard room={room} />
            </div>
          ))}
        </MessegeList>
      </MessegeBodyDiv>

      <MessageAdd src={AddMessage} onClick={()=>setOpenModal(true)} />
      { isOpenModal ? <MessageModal /> : null}
      { isOpenRoom ? <MessageRoom/> : null }

    </MessegePageDiv>
  );
};

export default MessagePage;

//리코일로 테스트하자 함수 너무 여러개라 어려움
  // const openNewRoom = () => {
  //   setNewRoomId
  //   setOpenRoomId(newRoomId);
  //   const newRoom:Room = {
  //     member: newRoomId,
  //     id: roomList.length+1
  //   }
  //   const newRoomList = [...roomList]
  //   newRoomList.push(newRoom)
  //   onClickToggleModal();
  //   setRoomList(newRoomList);
  //   onClickSetRoom();
  // };