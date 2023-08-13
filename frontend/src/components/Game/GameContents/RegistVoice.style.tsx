import { styled } from 'styled-components';

export const GameNoticeDiv = styled.div`
  width: 90%;
  height: 90%;
`;
export const RecordBtn = styled.button`
  display: block;
  margin: 0 auto;
  width: 10%;
  height: 10%;
  margin-top: 180px;
  background: none;
  border: none;
  cursor: pointer;
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
