import React, { PropsWithChildren, useState, ChangeEvent, useContext } from "react";
import styled from "styled-components";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import {
  Input,
  InputDiv,
  InputHeader,
} from "./BasicBox.style";
import { deleteMember } from "/src/api/login";
import AlertContext from "/src/context/alert/AlertContext";

interface ModalDefaultType {
  toggleDeleteMemberModal: () => void;
}

const MemberDeleteModal = ({ toggleDeleteMemberModal }: PropsWithChildren<ModalDefaultType>) => {
  const [checkPassword, setCheckPassword] = useState("");
  const { alert: alertComp } = useContext(AlertContext);
  const [exitBtnHover, setExitBtnHover] = useState(false);

  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  const onClickButton = async () => {
    const updateMemberRes = await deleteMember();

    if (!updateMemberRes) {
      onAlertClick("잘못된 비밀번호입니다");
      return;
    }

    onAlertClick("비밀번호가 수정되었습니다");
    toggleDeleteMemberModal();
  };

  const handleCheckField = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  return (
    <ModalContainer>
      <DialogBox>
        <div>
          <ExitImg
            src={exitBtnHover ? ExitBoxHover : ExitBox}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (toggleDeleteMemberModal) {
                toggleDeleteMemberModal();
              }
            }}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
          />
        </div>
        <div>
          <InputDiv>
            <InputHeader>Password</InputHeader>
            <Input type="password" onChange={handleCheckField} placeholder="비밀번호를 확인해주세요" />
          </InputDiv>
          <TagButton onClick={onClickButton}>
              <ButtonText>회원 탈퇴하기</ButtonText>
            </TagButton>
        </div>
      </DialogBox>
      <Backdrop />
    </ModalContainer>
  );
};
export default MemberDeleteModal;

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
  z-index: 12;
`;

const DialogBox = styled.dialog`
  width: 300px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  justify-content: center;
  text-align: center;
  /* align-items: center; */
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: #ffffff;
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
  z-index: 1;
`;

const TagButton = styled.div`
  color: black;
  border: 1px solid #999;
  border-radius: 8px;
  color: #6c6c6c;
  padding: 0 2.5%;
  font-size: 13px;
  width: 80%;
  height: 40px;
  margin: 8px auto;
  margin-top: 30px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    transition: 0.2s;
    
    background-color: #ccc;
    color: white;
    border-color: #ccc;
  }
`;

const ButtonText = styled.p`
  margin: 12px;
`;
