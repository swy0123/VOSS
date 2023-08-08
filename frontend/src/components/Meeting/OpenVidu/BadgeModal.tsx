import React, { PropsWithChildren, useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import ExitBox from "/src/assets/Messenger/ExitBox.png";
import ExitBoxHover from "/src/assets/Messenger/ExitBoxHover.png";
import ProfileImg from "../../../assets/Messenger/profile.png";
import SendArrow from "../../../assets/Messenger/SendArrow.png";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedMember } from "/src/recoil/Meeting";

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
  z-index: 10000;
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


const BadgeModal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
  const [selected, setSelected] = useRecoilState(selectedMember);
  const [exitBtnHover, setExitBtnHover] = useState(false);
  const navigate = useNavigate();
  //서버와 통신해서 해당 사용자의 친구목록 전부 표시 (이후 전역에 저장해 관리)
  //FriendsList
  useEffect(() => {
    console.log(selected)
  }, []);



  const getBadgeList = () => {
    //axios api
  }

  const handleMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    console.log("handleMouseOver over")
    event.stopPropagation();
  }
  const handleMouseOut = (event: MouseEvent<HTMLDivElement>) => {
    console.log("handleMouseOut out")
    event.stopPropagation();
  }

  return (
    <ModalContainer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <DialogBox>
        <div>
          <ExitImg
            src={exitBtnHover ? ExitBoxHover : ExitBox}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (onClickToggleModal) {
                onClickToggleModal();
              }
            }}
            onMouseEnter={() => setExitBtnHover(true)}
            onMouseLeave={() => setExitBtnHover(false)}
          />
        </div>
        {selected.userId} +
        {selected.email} +
        {selected.nickname} +
        {selected.userImgURL}


      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
};
export default BadgeModal;
