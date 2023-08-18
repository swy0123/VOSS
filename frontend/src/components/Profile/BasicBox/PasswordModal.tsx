import React, { PropsWithChildren, useState, ChangeEvent, useEffect, useContext } from "react";
import styled from "styled-components";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import Checked from "../../../assets/main/Checked.png";
import Email from "../../../assets/main/Email.png";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputDiv,
  InputHeader,
} from "./BasicBox.style";
import { authEmailConfirm } from "/src/api/join";
import { AssistWalker } from "@mui/icons-material";
import { putEmailPassword } from "/src/api/login";
import AlertContext from "/src/context/alert/AlertContext";
import { putPassword } from "/src/api/profile";

interface ModalDefaultType {
  togglePasswordModal: () => void;
}

const PasswordModal = ({ togglePasswordModal }: PropsWithChildren<ModalDefaultType>) => {
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { alert: alertComp } = useContext(AlertContext);
  const [count, setCount] = useState(298);
  const [min, setMin] = useState(4);
  const [sec, setSec] = useState(59);

  const [isActivate, setActivate] = useState(true);
  const [exitBtnHover, setExitBtnHover] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
      setMin(Math.floor((count % 3600) / 60));
      setSec(count % 60);
    }, 1000);
    if (count === -1) {
      handleActivate();
      console.log(isActivate);
      clearInterval(id);
    }
    return () => {
      clearInterval(id);
    };
  }, [count]);

  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  const onClickButton = async () => {
    if (newPassword.length < 4) {
      onAlertClick("비밀번호가 너무 짧습니다");
      return;
    }

    if (newPassword !== checkPassword) {
      onAlertClick("비밀번호 확인이 잘못되었습니다");
      return;
    }

    const updateMemberRes = await putPassword(originalPassword, newPassword);

    if (!updateMemberRes) {
      onAlertClick("잘못된 요청입니다");
      return;
    }

    onAlertClick("비밀번호가 수정되었습니다");
    togglePasswordModal();
  };

  const handleOriginField = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalPassword(e.target.value.split(' ').join(''));
  };

  const handleNewField = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value.split(' ').join(''));
  };

  const handleCheckField = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value.split(' ').join(''));
  };

  const handleActivate = () => {
    setActivate(false);
  };

  return (
    <ModalContainer>
      <DialogBox>
        <div>
          <ExitImg
            src={exitBtnHover ? ExitBoxHover : ExitBox}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (togglePasswordModal) {
                togglePasswordModal();
              }
            }}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
          />
        </div>
        <div>
          <InputDiv>
            <InputHeader>Password</InputHeader>
            <Input type="password" value={originalPassword} onChange={handleOriginField} placeholder="기존 비밀번호를 입력해주세요" />
          </InputDiv>
          <InputDiv>
            <InputHeader>New Password</InputHeader>
            <Input type="password" value={newPassword} onChange={handleNewField} placeholder="새로운 비밀번호를 입력해주세요" />
          </InputDiv>
          <InputDiv>
            <InputHeader>Check New Password</InputHeader>
            <Input type="password" value={checkPassword} onChange={handleCheckField} placeholder="비밀번호를 확인해주세요" />
          </InputDiv>
          <TagButton onClick={onClickButton}>
              <ButtonText>비밀번호 변경</ButtonText>
            </TagButton>
        </div>
      </DialogBox>
      <Backdrop />
    </ModalContainer>
  );
};
export default PasswordModal;

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
  height: 300px;
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
