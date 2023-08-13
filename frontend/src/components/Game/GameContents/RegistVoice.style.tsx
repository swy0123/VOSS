import { styled } from 'styled-components';

export const GameNoticeDiv = styled.div`
  width: 90%;
  height: 90%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 50%;
`;
export const RecordBtn = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
`;

export const NextBtn = styled.button`
  display: block;
  background: none;
  border: 2px solid white;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  margin: 20px;
  padding: 6px 12px;
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
