import React, { PropsWithChildren, useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import ExitBox from "../../../assets/Messenger/ExitBox.png";
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
import AvatarEditor from "./AvatarEditor";

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
  width: 400px;
  height: 500px;
  padding: 7px;
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
  position: relative;
  background-color: transparent;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  color: #6c6c6c;
  padding: 0 2.5%;
  font-size: 13px;
  width: 80%;
  height: 40px;
  margin: 8px auto;
  text-align: center;

  &:hover {
    transform: scale(1.05);
    transition: 0.2s;
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
  toggleAvatarModal: () => void;
}

const AvatarModal = ({ toggleAvatarModal }: ModalDefaultType) => {
  
  const [isActivate, setActivate] = useState(true);


  const handleActivate = () => {
    setActivate(false);
  };

  return (
    <ModalContainer>
      <DialogBox>
        <div>
          <ExitImg
            src={ExitBox}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (toggleAvatarModal) {
                toggleAvatarModal();
              }
            }}
          />
        </div>
        <div>
          <AvatarEditor/>
        </div>
          <div>
            생성
          </div>
      </DialogBox>
      <Backdrop 
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (toggleAvatarModal) {
            toggleAvatarModal();
          }
        }}/>
    </ModalContainer>
  );
};
export default AvatarModal;
