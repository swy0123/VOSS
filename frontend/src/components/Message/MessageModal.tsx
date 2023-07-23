import React, { PropsWithChildren, useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import ExitBox from "../../assets/Messenger/ExitBox.png";
import ProfileImg from "../../assets/Messenger/profile.png";
import SendArrow from "../../assets/Messenger/SendArrow.png";

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
  width: 360px;
  height: 400px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  /* align-items: center; */
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ExitImg = styled.img`
  position: absolute;
  right: 10px;
  top: 9px;
  width: 20px;
  height: 20px;
`;

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

interface Friend {
  id: number;
  name: string;
  img: string;
}

//이름 다 다른가?
const FriendsList = [
  { id: 11, name: "aaa", img: ProfileImg },
  { id: 12, name: "aaab", img:  ProfileImg },
  { id: 13, name: "bbc", img:  ProfileImg },
  { id: 14, name: "qweqe", img:  ProfileImg },
  { id: 15, name: "zxzc", img:  ProfileImg },
];

const MessageModal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
  const [searchForm, setSearch] = useState("");
  const [curList, setCurList] = useState<Friend[]>([]);

  //서버와 통신해서 해당 사용자의 친구목록 전부 표시 (이후 전역에 저장해 관리)
  //FriendsList
  useEffect(() => {
    setCurList([...FriendsList]);
  }, []);

  const handleSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterList = FriendsList.filter((p) => {
    return p.name.toLocaleLowerCase().includes(searchForm.toLocaleLowerCase());
  });

  const onClickOpenNewRoom = (name: string) =>{
    console.log(name);
    alert(name+"과의 대화방 열기. 복잡해서 리코일 적용 이후로 방 열기 구현 예정");
    //props로 전달해보려 했는데 모달에 함수 여러개 전달하려니까 안됨
  }


  return (
    <ModalContainer>
      <DialogBox>
        <div>
          친구찾기
          <ExitImg
            src={ExitBox}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (onClickToggleModal) {
                onClickToggleModal();
              }
            }}
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
        {children}

        {
          // 여기에 모달 친구추가 컴포넌트 만들어야..
          // 이미지, 이름 props로 전달 클릭 시 이벤트...
          // messagepage에서 props로 함수도 받아서 있는 방인지 확인하고
          // 해당 방으로 옮기거나 새로운 방 개설..
        }
        {filterList.map((friend) => (
          <div key={friend.id}>
            <img src={friend.img} />
            <span>{friend.name}</span>
            <img src={SendArrow} onClick={()=>onClickOpenNewRoom(friend.name)}/>
          </div>
        ))}
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
};
export default MessageModal;
