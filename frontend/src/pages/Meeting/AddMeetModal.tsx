import React, { PropsWithChildren, useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import ExitBox from "../../assets/Messenger/ExitBox.png";
import ProfileImg from "../../assets/Messenger/profile.png";
import SendArrow from "../../assets/Messenger/SendArrow.png";
import { createMeet } from "../../api/meeting";
import { useNavigate } from "react-router-dom";

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
  background-color: #8a8a8a;
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

const TagButton = styled.div<{ $IsClick: boolean }>`
  position: relative;
  background-color: transparent;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  color: #6c6c6c;
  font-size: 15px;
  font-weight: bold;
  margin: 8px;
  padding: 5px;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
  color: ${(props) => (props.$IsClick ? "white" : "#6C6C6C")};
  border: solid ${(props) => (props.$IsClick ? "2px white" : "1px #6C6C6C")};
`;

const TmpBorder = styled.span`
  margin: 2px;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  border-color: red;
`;

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

interface Friend {
  id: number;
  name: string;
  img: string;
}

const AddMeetModal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setCheckBox] = useState(false);
  const [limit, setLimit] = useState(0);
  const TagName = ["목소리 분석 연습", "더빙 연습", "기타"];
  const [selectedTag, setTag] = useState<boolean[]>([false, false, false]);
  const [selectedCategory, setCategory] = useState("");
  const Category = ["DUB", "PRACTICE", "FREE"];
  const navigate = useNavigate();
  //서버와 통신해서 해당 사용자의 친구목록 전부 표시 (이후 전역에 저장해 관리)
  //FriendsList
  useEffect(() => { }, []);

  const handleTagButton = (index: number) => {
    const newTagList = Array(TagName.length).fill(false);
    newTagList[index] = !newTagList[index];
    setCategory(Category[index]);
    setTag(newTagList);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changeCheck = () => {
    setCheckBox(!isChecked);
  };
  const limitIncrease = () => {
    if (limit < 6) setLimit(limit + 1);
  };
  const limitDecrease = () => {
    if (limit > 0) setLimit(limit - 1);
  };

  const onClickOpenNewMeetRoom = async () => {
    console.log("title : " + title + ", password : " + password + ", limit : " + limit);
    console.log(", isChecked : " + isChecked + ", selectedTag : " + selectedTag);

    const addRoomData = {
      title: title,
      maxCount: limit,
      password: password,
      category: selectedCategory
    }
    const meetRoomId = await createMeet({ addRoomData });
    console.log("방 생성 후 참가 시도");
    joinMeetingRoom(meetRoomId, password);
  };

  const joinMeetingRoom = (meetRoomId: number, password: string) => {
    console.log("meetRoomId : " + meetRoomId + ", password : " + password + " 이동");
    navigate(`/meeting/join`, { state: { meetRoomId: meetRoomId, password: password } });
  };

  return (
    <ModalContainer>
      <DialogBox>
        {children}
        <div>
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
        <span>카테고리</span>
        {TagName.map((data, index) => (
          <TagButton
            key={index}
            $IsClick={selectedTag[index]}
            onClick={() => handleTagButton(index)}
          >
            {data}
          </TagButton>
        ))}
        <span>제목</span>
        <form>
          <input className="input" type="text" onChange={handleTitle} value={title}></input>

          <div>
            비밀번호
            <input type="checkbox" onClick={changeCheck} />
          </div>
          {isChecked}
          {isChecked ? (
            <input className="input" type="text" onChange={handlePassword} value={password}></input>
          ) : (
            <input
              className="input"
              type="text"
              onChange={handlePassword}
              value={password}
              disabled
            ></input>
          )}

          <div>
            <div>인원</div>
            <TmpBorder onClick={limitDecrease}>-</TmpBorder>
            <TmpBorder>{limit}</TmpBorder>
            <TmpBorder onClick={limitIncrease}>+</TmpBorder>
          </div>
          <button type="button" onClick={onClickToggleModal}>
            취소
          </button>
          <button type="button" onClick={onClickOpenNewMeetRoom}>
            확인
          </button>
        </form>

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
export default AddMeetModal;
