import React, { PropsWithChildren, useState, ChangeEvent, useEffect, useContext } from "react";
import styled from "styled-components";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import Checked from "../../../assets/main/Checked.png";
import Email from "../../../assets/main/Email.png";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  H2,
  Input,
  InputDiv,
  InputHeader,
  P,
  ShowIcon,
  Img,
  Title,
  UnderText,
  Timer,
} from "./Join.style";
import { authEmailConfirm } from "/src/api/join";
import AlertContext from "/src/context/alert/AlertContext";

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
  width: 300px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
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
// const TagButton = styled.div<{ $IsClick: boolean }>`
//   position: relative;
//   background-color: transparent;
//   border: 1px solid #6c6c6c;
//   border-radius: 5px;
//   color: #6c6c6c;
//   font-size: 15px;
//   font-weight: bold;
//   margin: 8px;
//   padding: 5px;

//   &:hover {
//     transform: scale(1.1);
//     transition: 0.3s;
//   }
//   color: ${(props) => (props.$IsClick ? "white" : "#6C6C6C")};
//   border: solid ${(props) => (props.$IsClick ? "2px white" : "1px #6C6C6C")};
// `;

interface ModalDefaultType {
  toggleModal: () => void;
  email: string;
  isEmailCheckd: () => void;
  HandleIsEnd: () => void;
}

const EmailModal = ({ toggleModal, email, isEmailCheckd, HandleIsEnd }: PropsWithChildren<ModalDefaultType>) => {
  const [token, setToken] = useState("");

  const [count, setCount] = useState(298);
  const [min, setMin] = useState(4);
  const [sec, setSec] = useState(59);

  const [isActivate, setActivate] = useState(true);
  const [exitBtnHover, setExitBtnHover] = useState(false);


  const { alert: alertComp } = useContext(AlertContext);
  const onAlertClick = async (text:string) => {
    const result = await alertComp(text);
    console.log("custom", result);
    
    HandleIsEnd();
  };

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

  const onClickButton = async () => {
    const props = {
      email: email,
      token: token,
    };
    const emailCheck = await authEmailConfirm(props);
    console.log(emailCheck)
    if (emailCheck) {
      onAlertClick("인증 완료");
      isEmailCheckd();
      toggleModal();
    }
    else{
      console.log("dsssssssssd")
      onAlertClick("인증 코드를 확인해주세요");
    }
  };

  const handleCheckField = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
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
              if (toggleModal) {
                toggleModal();
              }
            }}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
          />
        </div>
        <div>
          <InputDiv>
            <InputHeader>Confirm Code</InputHeader>
            <Input type="text" onChange={handleCheckField} placeholder="인증코드를 입력해주세요" $isChecked={true} />
            {isActivate ? (
              <TagButton onClick={onClickButton}>
                <ButtonText>인증하기</ButtonText>
              </TagButton>
            ) : (
              <TagButton onClick={toggleModal}>
                <ButtonText>다시 인증해주세요</ButtonText>
              </TagButton>
            )}
          </InputDiv>
        </div>
        <div>
          {isActivate ? (
            <Timer>
              {min.toString().length < 2 ? '0' + min : min} : {sec.toString().length < 2 ? '0' + sec : sec}
            </Timer>
          ) : (
            <></>
          )}
        </div>
      </DialogBox>
      <Backdrop />
    </ModalContainer>
  );
};
export default EmailModal;
