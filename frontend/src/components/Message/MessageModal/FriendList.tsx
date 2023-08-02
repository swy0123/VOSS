import React from "react";
import { useRecoilState } from "recoil";
import { ShowFindFriendState, ShowMessageRoomState, RoomListState, FriendListState, OpenRoomIdState} from "/src/recoil/Messenger";
import SendArrow from "/src/assets/Messenger/SendArrow.png";

interface Friend {
  id: number;
  name: string;
  img: string;
}

interface Room {
  member: string;
  id: number;
}


const FriendList = () => {
  const [roomList, setRoomList] = useRecoilState(RoomListState);
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [openRoomId, setOpenRoomId] = useRecoilState(OpenRoomIdState);
  const [friendList, setFriendList] = useRecoilState<Friend[]>(FriendListState);
  const [searchForm, setSearch] = useState("");

  const onClickOpenNewRoom = (name: string, id: number) => {
    if (!roomList.some(room => room.member === name)) {
      setRoomList((prev: Room[]) => [{member: name, id: id}, ...prev, ])
    }
    setOpenModal(false);
    setOpenRoom(true);
    setOpenRoomId(name);
  };

  const filterList = friendList.filter((p) => {
    return p.name.toLocaleLowerCase().includes(searchForm.toLocaleLowerCase());
  });

  return (
    <div style={{ overflowY: "auto", height: "200px" }}>
      {filterList.map((friend) => (
        <div key={friend.id}>
          <img src={friend.img} />
          <span>{friend.name}</span>
          <img src={SendArrow} onClick={()=>onClickOpenNewRoom(friend.name, friend.id)}/>
        </div>
      ))}
    </div>
  );
};

export default FriendList;