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

const Temp = [
  { member: "이시영1", id: 1 },
  { member: "정현우1", id: 2 },
  { member: "김준섭1", id: 3 },
  { member: "이시영2", id: 4 },
  { member: "정현우2", id: 5 },
  { member: "김준섭2", id: 6 },
  { member: "이시영3", id: 7 },
  { member: "정현우3", id: 8 },
  { member: "김준섭3", id: 9 },
  { member: "이시영4", id: 10 },
  { member: "정현우4", id: 11 },
  { member: "김준섭4", id: 12 },
];

type Props = {
  handleMessageField: () => void;
};

const MessagePage: React.FC<Props> = ({ handleMessageField }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [result, setResult] = useState(Temp);
  const [isOpenRoom, setOpenRoom] = useState(false);
  const [openRoomId, setOpenRoomId] = useState("");

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const onClickSetRoom = () => {
    console.log(openRoomId);
    setOpenRoom(!isOpenRoom);
    console.log(openRoomId);
  };

  const onClickSetRoomId = (id: string) => {
    setOpenRoomId(id);
    onClickSetRoom();
  };

  // setResult(Temp); //채팅방 목록 넣기

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
            {result.map((room) => (
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
