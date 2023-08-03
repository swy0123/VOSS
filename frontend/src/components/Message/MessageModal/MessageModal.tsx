import React, { PropsWithChildren, useState, ChangeEvent, MouseEvent, useEffect } from "react";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import SendArrow from "/src/assets/Messenger/SendArrow.png";
import { useRecoilState } from "recoil";
import { ShowFindFriendState, ShowMessageRoomState, RoomListState, FriendListState, OpenRoomIdState} from "/src/recoil/Messenger";
import { ModalContainer, DialogBox, Backdrop, ExitImg, FriendTitleDesign, FriendSearchDesign, FriendListDesign, FriendListItemDesign, FriendListItem1, FriendListItem2, FriendListItem3, } from "./MessageModal.style"


interface Friend {
  id: number;
  name: string;
  img: string;
}

interface Room {
  member: string;
  id: number;
}

const MessageModal = () => {
  const [roomList, setRoomList] = useRecoilState(RoomListState);
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [openRoomId, setOpenRoomId] = useRecoilState(OpenRoomIdState);
  const [friendList, setFriendList] = useRecoilState<Friend[]>(FriendListState);
  const [inputs, setInputs] = useState("");
  const SearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs(event.target.value);
  };

  const onClickOpenNewRoom = (name: string, id: number) => {
    if (!roomList.some(room => room.member === name)) {
      setRoomList((prev: Room[]) => [{member: name, id: id}, ...prev, ])
    }
    setOpenModal(false);
    setOpenRoom(true);
    setOpenRoomId(name);
  };

  const filterList = friendList.filter((friend) =>
    friend.name.toLowerCase().includes(inputs.toLowerCase())
  );

  return (
    <ModalContainer>
      <DialogBox>

        <FriendTitleDesign>
          친구찾기
          <ExitImg src={ExitBox} onClick={()=>setOpenModal(false)}/>
        </FriendTitleDesign>
        <FriendSearchDesign>
          <form action="">
            <input
              placeholder="Search"
              style={{ backgroundColor: "transparent", border: "none", width: "100%", fontSize: "15px", outline: "none",}}
              className="input"
              type="text"
              onChange={SearchInput}
              value={inputs}
            ></input>
          </form>
        </FriendSearchDesign>

        <FriendListDesign>
          {filterList.map((friend) => (
          <FriendListItemDesign key={friend.id}>
            <FriendListItem1><img style={{height: '80%'}} src={friend.img} /></FriendListItem1>
            <FriendListItem2><span>{friend.name}</span></FriendListItem2>
            <FriendListItem3><img style={{width: "22px"}} src={SendArrow} onClick={()=>onClickOpenNewRoom(friend.name, friend.id)}/></FriendListItem3>
          </FriendListItemDesign>
          ))}
        </FriendListDesign>

      </DialogBox>
      <Backdrop onClick={()=>setOpenModal(false)}/>
    </ModalContainer>
  );
};

export default MessageModal;
