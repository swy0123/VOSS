import { styled,keyframes } from 'styled-components';

export const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RecordControls = styled.audio`
  display: block;
  margin: 0 auto;
`;

export const GameNoticeDiv = styled.div`
  width: 90%;
  height: 90%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const RecordBtn = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  transition: box-shadow 0.5s, background-color 0.5s, color 0.5s;
`;

export const RegistBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #219653;
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  margin: 40px;
  padding: 12px;
  font-size: 15px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #27ae60;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

export const NextBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffae00;
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  margin: 40px;
  padding: 12px;
  font-size: 15px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #ffc000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

export const GameTitle = styled.img`
  width: 45%;
  height: 9%;
`;
export const GameExplain = styled.div`
  margin-top: 30px;
  font-size: 25px;
  color: white;
`;

export const FinishExplain = styled.div`
  margin-top: 18%;
  font-size: 25px;
  color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const FinishBtn = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #107e5d;
  width: 170px;
  height: 31px;
  margin: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 20px #107e5d;
    transition: 0.2s;
  }
`;

export const RecordButton = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #107e5d;
  width: 170px;
  height: 31px;
  margin: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 20px #107e5d;
    transition: 0.2s;
  }
`;

export const RecordExplain = styled.div`
  margin-top: 80px;
  font-size: 25px;
  color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const StyledDivWithText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  padding: 20px;
  color: white;
  width: 60%;
  margin: 60px auto;
`;

const wave = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3.5);
    opacity: 0;
  }
`;

export const Waves = styled.div`
  position: absolute;
  z-index: -1;
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: white;
    margin: -78.2px 0px 0px 25.2px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: ${wave} 3s infinite linear;
  }

  &::after {
    opacity: 0;
    -webkit-animation: ${wave} 3s 1.5s infinite linear;
    animation: ${wave} 3s 1.5s infinite linear;
  }
`;