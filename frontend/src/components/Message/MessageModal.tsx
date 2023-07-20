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
    display: flex;
    flex-direction: column;
    align-items: center;
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
                <ExitImg src={ExitBox} onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}/>

                {children}
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