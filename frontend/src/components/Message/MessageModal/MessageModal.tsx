import {  useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import SendArrow from "/src/assets/Messenger/SendArrow.png";
import SendArrowHover from "/src/assets/Messenger/SendArrowHover.png";
import ProfileNull from "/src/assets/Profile/ProfileNull.png";
import { useRecoilState } from "recoil";
import { getUsers, createMessageRoom, getMessages, getMessageRooms } from "/src/api/messenger";
import { UserType, RoomType, MessageType } from "/src/type/Auth";
import { ShowFindFriendState, ShowMessageRoomState, RoomsState, CurrentRoomState, MessagesState } from "/src/recoil/Messenger";
import { ModalContainer, DialogBox, Backdrop, ExitImg, FriendTitleDesign, FriendSearchDesign, FriendListDesign, FriendListItemDesign, FriendListItem1, FriendListItem2, FriendListItem3, } from "./MessageModal.style"

const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com";

const MessageModal = () => {
  const navigate = useNavigate()
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(ShowFindFriendState);
  const [isOpenRoom, setOpenRoom] = useRecoilState<boolean>(ShowMessageRoomState);
  const [currentRoom, setCurrentRoom] = useRecoilState(CurrentRoomState);
  const [rooms, setRooms] = useRecoilState(RoomsState);
  const [messages, setMessages] = useRecoilState<MessageType[]>(MessagesState);
  const [users, setUsers] = useState([])
  const [inputs, setInputs] = useState("");
  const [exitBtnHover, setExitBtnHover] = useState(false);
  const [isSendHover, setSendHover] = useState<number>(-1);
  const SearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs(event.target.value);
  };

  const goToRoom = (id: number) => {
    
    const exist = rooms.find((room: RoomType) => room.memberId === id)
    if (exist) {
      setCurrentRoom(exist);
      getMessages(exist.chatId, 0, 20).then((dataMessages) => {
        if (dataMessages) {
          const reverse = dataMessages.content.reverse();
          setMessages(reverse)
          setOpenModal(false);
          setOpenRoom(true);
        }
      })
    } else {
      createMessageRoom(id).then((dataRoom) => {
        if (dataRoom) {
          getMessageRooms().then((dataRooms) => {
            if (dataRooms) {
              setRooms(dataRooms)
              setCurrentRoom(dataRooms[0])
              setMessages([]);
              setOpenModal(false);
              setOpenRoom(true);
  }})}})}};

  const goProfile = (id: number) => {
    navigate(`/profile/${id}`);
    setOpenModal(false);
  };

  useEffect(() => {
    if (inputs.trim().length > 0) {
      getUsers(inputs, 0, 30).then((userData) => {
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
          {users.map((user: UserType, index: number) => (
          <FriendListItemDesign key={index}>
            <FriendListItem1>
              { user.imageUrl.length > 0
              ? <img onClick={()=>(goProfile(user.memberId))} src={`${FILE_SERVER_URL}/${user.imageUrl}`} />
              : <img onClick={()=>(goProfile(user.memberId))} src={ProfileNull} />
              }
            </FriendListItem1>
            <FriendListItem2><span onClick={()=>(goProfile(user.memberId))}>{user.nickname}</span></FriendListItem2>
            <FriendListItem3
              onMouseEnter={()=>setSendHover(index)}
              onMouseLeave={()=>setSendHover(-1)}
            >
              { isSendHover === index
              ? <img src={SendArrowHover} onClick={()=>goToRoom(user.memberId)}/>
              : <img src={SendArrow} onClick={()=>goToRoom(user.memberId)}/>
              }
            </FriendListItem3>
          </FriendListItemDesign>
          ))}
        </FriendListDesign>

        { inputs.trim().length > 0 && users.length === 0
        ? <FriendListItemDesign style={{marginBottom: '170px'}}>해당하는 친구가 없습니다</FriendListItemDesign>
        : null
        } 

      </DialogBox>
      <Backdrop onClick={()=>setOpenModal(false)}/>
    </ModalContainer>
  );
};

export default MessageModal;
