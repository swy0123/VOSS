import React, { PropsWithChildren, useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import ProfileImg from "../../assets/Messenger/profile.png";
import SendArrow from "../../assets/Messenger/SendArrow.png";
import { createMeet } from "../../../api/meeting";
import { useNavigate } from "react-router-dom";
import { Backdrop, CategoryDiv, DialogBox, ModalContainer, PasswordInput, Span, TagButton, Title, TitleInput, TmpBorder } from "./AddMeetModal.style";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}


const AddMeetModal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setCheckBox] = useState(false);
  const [limit, setLimit] = useState(2);
  const TagName = ["목소리 분석 연습", "더빙 연습", "기타"];
  const [selectedTag, setTag] = useState<boolean[]>([false, false, false]);
  const [selectedCategory, setCategory] = useState("");
  const Category = ["DUB", "PRACTICE", "FREE"];
  const [exitBtnHover, setExitBtnHover] = useState(false);
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
    if (limit > 2) setLimit(limit - 1);
  };

  const addRoomData = {
    title: title,
    maxCount: limit,
    password: password,
    category: selectedCategory
  }
  const onClickOpenNewMeetRoom = async () => {
    console.log("title : " + title + ", password : " + password + ", limit : " + limit);
    console.log(", isChecked : " + isChecked + ", selectedTag : " + selectedTag);


    const meetRoomId = await createMeet({ addRoomData });
    console.log("방 생성 후 참가 시도");
    joinMeetingRoom(meetRoomId, password);
  };

  const joinMeetingRoom = (meetRoomId: number, password: string) => {
    console.log("meetRoomId : " + meetRoomId + ", password : " + password + " 이동");
    navigate(`/meeting/join`, { state: { password: password, meetRoomId: meetRoomId } });
  };

  return (
    <ModalContainer>
      <DialogBox>
        <div>
          <Title>방만들기</Title>
          {/* <ExitImg
            src={exitBtnHover ? ExitBoxHover : ExitBox}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (onClickToggleModal) {
                onClickToggleModal();
              }
            }}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
          /> */}
          <Span>카테고리</Span>
          <CategoryDiv>
            {TagName.map((data, index) => (
              <TagButton
                key={index}
                $IsClick={selectedTag[index]}
                onClick={() => handleTagButton(index)}
              >
                {data}
              </TagButton>
            ))}
          </CategoryDiv>

          <form>
            <Span>제목</Span>
            <TitleInput className="input" type="text" onChange={handleTitle} value={title}></TitleInput>
              
            <div>
              <Span>비밀번호
              <input type="checkbox" onClick={changeCheck} /></Span>
            <Span style={{marginLeft:"50%"}}>인원</Span>
            </div>
            
            <div>
              {isChecked ? (
                <input className="input" type="text" onChange={handlePassword} value={password}></input>
              ) : (
                <PasswordInput
                  className="input"
                  type="text"
                  onChange={handlePassword}
                  value={password}
                  disabled
                ></PasswordInput>
              )}

              <div>
                <TmpBorder onClick={limitDecrease}>-</TmpBorder>
                <TmpBorder>{limit}</TmpBorder>
                <TmpBorder onClick={limitIncrease}>+</TmpBorder>
              </div>

            </div>

          </form>


          <button type="button" onClick={onClickToggleModal}>
            취소
          </button>
          <button type="button" onClick={onClickOpenNewMeetRoom}>
            확인
          </button>

        </div>
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
