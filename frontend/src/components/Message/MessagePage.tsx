import { styled } from "styled-components";
import ExitBox from "../../assets/Messenger/ExitBox.png";
import AddMessage from "../../assets/Messenger/AddMessage.png";
import MessageCard from "./MessageCard";
import { useCallback, useEffect, useState } from "react";
import MessageModal from "./MessageModal";
import MessageRoom from "./MessageRoom";

const MessegePageDiv = styled.div`
  width: 300px;
  height: 400px;
  border-color: D2D2D2;
  border-radius: 15px;
  border-style: solid;
  border: 1px;
  background-color: #efefef;
  position: fixed;
  right: 25px;
  bottom: 25px;
`;

const MessegeTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
`;

const ExitImg = styled.img`
  position: absolute;
  right: 10px;
  top: 9px;
  width: 20px;
  height: 20px;
`;

const MessegeBodyDiv = styled.div`
  margin: 0 auto;
`;

const MessegeList = styled.div`
  height: 340px;
  position: relative;
  /* margin: 1px; */
  display: grid;
  grid-template-columns: repeat(auto-fill, 100%);
  grid-gap: 5px;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageAdd = styled.img`
  position: absolute;
  right: 10px;
  bottom: 9px;
  width: 30px;
  height: 30px;
`;


interface Room {
  member: string;
  id: number;
};

const Temp = [
  { member: "이시영", id: 1 },
  { member: "정현우", id: 2 },
  { member: "김준섭", id: 3 },
  { member: "이원영", id: 4 },
  { member: "이승종", id: 5 },
  { member: "이수연", id: 6 },
  { member: "김하진", id: 7 },
  { member: "김선진", id: 8 },
  { member: "류민지", id: 9 },
  { member: "아무나", id: 10 },
];


type Props = {
  handleMessageField: () => void;
};

const MessagePage: React.FC<Props> = ({ handleMessageField }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [roomList, setRoomList] = useState(Temp);
  const [isOpenRoom, setOpenRoom] = useState(false);
  const [openRoomId, setOpenRoomId] = useState("");
  // const [newRoomId, setNewRoomId] = useState("");

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const onClickSetRoom = () => {
    console.log(openRoomId);
    setOpenRoom(!isOpenRoom);
  };

  //아이디를 어케 쓸지 다시 정해야 함 현재 사람이름, 인덱스 등 뒤죽박죽임
  const onClickSetRoomId = (id: string) => {
    setOpenRoomId(id);
    onClickSetRoom();
  };

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

  return (
    <div>
      <MessegePageDiv>
        <div>
          <MessegeTitle>채팅목록</MessegeTitle>
          <ExitImg src={ExitBox} onClick={handleMessageField} />
          <hr />
        </div>

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

        <MessageAdd src={AddMessage} onClick={onClickToggleModal} />

        {isOpenModal && (
          <MessageModal onClickToggleModal={onClickToggleModal}>방 추가하기</MessageModal>
        )}
      </MessegePageDiv>
      { isOpenRoom? (
        <MessageRoom onClickSetRoom={onClickSetRoom} openRoomId={openRoomId}></MessageRoom>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MessagePage;
