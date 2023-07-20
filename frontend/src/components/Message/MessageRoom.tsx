import { styled } from "styled-components";
import ExitBox from "../../assets/Messenger/ExitBox.png"

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


type Props = {
    handleMessageField: () => void;
}

const MessageRoom: React.FC<Props> = ({ handleMessageField }) => {

    return (
        <MessegeListDiv>
            <div>
                <MessegeTitle>채팅목록</MessegeTitle>
                <ExitImg src={ExitBox} onClick={handleMessageField} />
                <hr />
            </div>

            <MessegeBodyDiv>

            </MessegeBodyDiv>
        </MessegeListDiv>

    )

}

export default MessageRoom;