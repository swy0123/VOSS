import {  useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import SendArrow from "/src/assets/Messenger/SendArrow.png";
import ProfileImg from "/src/assets/Messenger/profile.png";
import { useRecoilState } from "recoil";
import { getUsers } from "/src/api/messenger";
import { ShowFindFriendState, ShowMessageRoomState, RoomsState, OpenRoomIdState } from "/src/recoil/Messenger";
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
  const navigate = useNavigate()
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [openRoomId, setOpenRoomId] = useRecoilState(OpenRoomIdState);
  const [rooms, setRooms] = useRecoilState(RoomsState);
  const [users, setUsers] = useState([])
  const [inputs, setInputs] = useState("");
  const [exitBtnHover, setExitBtnHover] = useState(false);
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
  const goProfile = (id: number) => {
    navigate(`/profile/${id}`);
    setOpenModal(false);
  };


  useEffect(() => {
    if (inputs.length > 0) {
      getUsers(inputs, 0, 20).then((userData) => {
        if (userData) {
          setUsers(userData.content)
        }
      })
    } else {
      setUsers([])
    }
  }, [inputs])

  return (
    <ModalContainer>
      <DialogBox>

        <FriendTitleDesign>
          친구찾기
          <ExitImg 
            src={exitBtnHover ? ExitBoxHover : ExitBox}
            onClick={()=>setOpenModal(false)}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
          />
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
            <FriendListItem1><img onClick={()=>(goProfile(user.memberId))} style={{height: '80%'}} src={ProfileImg} /></FriendListItem1>
            <FriendListItem2><span onClick={()=>(goProfile(user.memberId))}>{user.nickname}</span></FriendListItem2>
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
