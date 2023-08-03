import {  useState, ChangeEvent, MouseEvent, useEffect } from "react";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import SendArrow from "/src/assets/Messenger/SendArrow.png";
import ProfileImg from "/src/assets/Messenger/profile.png";
import { useRecoilState } from "recoil";
import { ShowFindFriendState, ShowMessageRoomState, RoomsState, OpenRoomIdState} from "/src/recoil/Messenger";
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
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [openRoomId, setOpenRoomId] = useRecoilState(OpenRoomIdState);
  const [rooms, setRooms] = useRecoilState(RoomsState);
  const [users, setUsers] = useState([])
  const [inputs, setInputs] = useState("");
  const SearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs(event.target.value.trim());
  };
  const goToNewRoom = (name: string, id: number) => {
    if (!rooms.some(room => room.memberId === id)) {
      console.log("goToNewRoom")
    }
    setOpenModal(false);
    setOpenRoom(true);
    setOpenRoomId(name);
  };

  useEffect(() => {
    if (inputs.length > 0) {
      getUsers(inputs, 1, 30).then((userData) => {
        if (userData) {
          setUsers(userData.content)
        }
      })
    }
  }, [inputs])

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
          {users.map((user) => (
          <FriendListItemDesign key={user.memberId}>
            <FriendListItem1><img style={{height: '80%'}} src={ProfileImg} /></FriendListItem1>
            <FriendListItem2><span>{user.nickname}</span></FriendListItem2>
            <FriendListItem3><img src={SendArrow} onClick={()=>goToNewRoom(user.nickname, user.memberId)}/></FriendListItem3>
          </FriendListItemDesign>
          ))}
        </FriendListDesign>

      </DialogBox>
      <Backdrop onClick={()=>setOpenModal(false)}/>
    </ModalContainer>
  );
};

export default MessageModal;
