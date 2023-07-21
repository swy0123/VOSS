import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import ExitBox from "../../assets/Messenger/ExitBox.png"

const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top:0;
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

const MessageModal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
    return (
        <ModalContainer>
            <DialogBox>
                친구찾기
                <ExitImg src={ExitBox} onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}/>
                <form>
                    <input type="text"></input>
                </form>
                {children}
                {
                    // 여기에 모달 친구추가 컴포넌트 만들어야..
                    // 이미지, 이름 props로 전달 클릭 시 이벤트...
                    // messagepage에서 props로 함수도 받아서 있는 방인지 확인하고
                    // 해당 방으로 옮기거나 새로운 방 개설..
                }
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
}
export default MessageModal;