import React, { PropsWithChildren, useState, ChangeEvent, MouseEvent, useEffect } from "react";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import FriendList from "./FriendList";
import { useRecoilState } from "recoil";
import { ShowFindFriendState, ShowMessageRoomState, RoomListState, FriendListState, OpenRoomIdState} from "/src/recoil/Messenger";
import { ModalContainer, DialogBox, Backdrop, ExitImg } from "./MessageModal.style"


interface ModalDefaultType {
  onClickToggleModal: () => void;
}

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
  const [searchForm, setSearch] = useState("");
  const [curList, setCurList] = useState<Friend[]>([]);
  const [friendList, setFriendList] = useRecoilState<Friend[]>(FriendListState);

  //서버와 통신해서 해당 사용자의 친구목록 전부 표시 (이후 전역에 저장해 관리)
  //FriendsList
  useEffect(() => {
    setCurList([...friendList]);
  }, []);

  const handleSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };


  return (
    <ModalContainer>
      <DialogBox>
        <div>
          친구찾기
          <ExitImg
            src={ExitBox}
            onClick={()=>setOpenModal(false)}
          />
        </div>

        <form>
          <input
            className="input"
            type="text"
            onChange={handleSearchForm}
            value={searchForm}
          ></input>
        </form>
        <FriendList></FriendList>
      </DialogBox>
      <Backdrop onClick={()=>setOpenModal(false)}/>
    </ModalContainer>
  );
};

export default MessageModal;
