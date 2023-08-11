import { styled } from "styled-components";

export const GameNoticeDiv = styled.div`
  width: 90%;
  height: 90%;
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

export const StartButton = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #107E5D;
  width: 170px;
  height: 31px;
  margin: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 20px #107E5D;
    transition: 0.2s;
  }
`;