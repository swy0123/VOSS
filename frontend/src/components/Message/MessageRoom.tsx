import { styled } from "styled-components";
import ExitBox from "../../assets/Messenger/ExitBox.png"
import AddMessage from "../../assets/Messenger/AddMessage.png"
import MessageCard from "./MessageCard";
import { useCallback, useState } from "react";
import MessageModal from "./MessageModal";

const MessegeListDiv = styled.div`
    width: 300px;
    height: 400px;
    border-color: D2D2D2;
    border-radius: 15px;
    border-style: solid;
    border: 1px;
    background-color: #EFEFEF;
    position: fixed;
    right: 25px;
    bottom: 25px;
    opacity: 97%;
`;

const MessegeTitle = styled.div`
    font-size: 15px;
    font-weight: bolder;
    margin-top: 10px;
    margin-left: 10px;
`;

const ExitImg = styled.img`
    position: absolute;
    right: 10px;
    top: 9px;
    width: 20px;
    height: 20px;
`;

const MessegeBodyDiv = styled.div`
    margin: 0 auto;
`;

const MessegeList = styled.div`
`;

const MessageAdd = styled.img`
    position: absolute;
    right: 10px;
    bottom: 9px;
    width: 30px;
    height: 30px;
`;

type Props = {
    handleMessageField: () => void;
}

const MessageRoom: React.FC<Props> = ({ handleMessageField }) => {

    const [isOpenModal, setOpenModal] = useState<boolean>(false);

    const onClickToggleModal = useCallback(() => {
        setOpenModal(!isOpenModal);
    }, [isOpenModal]);

    return (
        <MessegeListDiv>
            <div>
                <MessegeTitle>채팅목록</MessegeTitle>
                <ExitImg src={ExitBox} onClick={handleMessageField} />
                <hr />
            </div>

            <MessegeBodyDiv>
                <MessegeList>
                    <div ><MessageCard></MessageCard></div>
                    <MessageCard></MessageCard>
                </MessegeList>

            </MessegeBodyDiv>

            <MessageAdd src={AddMessage} onClick={onClickToggleModal}/>

            {isOpenModal && (
                <MessageModal onClickToggleModal={onClickToggleModal}>
                    방 추가하기
                </MessageModal>
            )}
        </MessegeListDiv>

    )

}

export default MessageRoom;