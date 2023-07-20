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
  font-size: 15px;
  font-weight: bolder;
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
  height: 300px;
  position: relative;
  margin: 1px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100%);
  grid-gap: 4px;
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
  { name: "이시영1", msg: "뭐함;;", roomNum: 1 },
  { name: "정현우1", msg: "뭐뭐함;;", roomNum: 2 },
  { name: "김준섭1", msg: "뭐뭐뭐함;;", roomNum: 3 },
  { name: "이시영2", msg: "뭐함;;", roomNum: 4 },
  { name: "정현우2", msg: "뭐뭐함;;", roomNum: 5 },
  { name: "김준섭2", msg: "뭐뭐뭐함;;", roomNum: 6 },
  { name: "이시영3", msg: "뭐함;;", roomNum: 7 },
  { name: "정현우3", msg: "뭐뭐함;;", roomNum: 8 },
  { name: "김준섭3", msg: "뭐뭐뭐함;;", roomNum: 9 },
  { name: "이시영4", msg: "뭐함;;", roomNum: 10 },
  { name: "정현우4", msg: "뭐뭐함;;", roomNum: 11 },
  { name: "김준섭4", msg: "뭐뭐뭐함;;", roomNum: 12 },
];

type Props = {
  handleMessageField: () => void;
};

const MessagePage: React.FC<Props> = ({ handleMessageField }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [result, setResult] = useState(Temp);
  const [isOpenRoom, setOpenRoom] = useState(false);
  const [openRoomNum, setOpenRoomNum] = useState(0);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const onClickSetRoom = () => {
    console.log(openRoomNum);
    setOpenRoom(!isOpenRoom);
    console.log(openRoomNum);
  };

  const onClickSetRoomNum = (num: number) => {
    setOpenRoomNum(num);
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
              <div key={room.name} onClick={() => onClickSetRoomNum(room.roomNum)}>
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
        <MessageRoom onClickSetRoom={onClickSetRoom} openRoomNum={openRoomNum}></MessageRoom>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MessagePage;
