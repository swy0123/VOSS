import { styled } from "styled-components";

export const GameNoticeDiv = styled.div`
  width: 90%;
  height: 90%;
`;
export const GameTitle = styled.img`
  width: 45%;
  height: 9%;
  cursor: pointer;

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

export const PlayExplain = styled.div`
  margin-top: 80px;
  font-size: 28px;
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
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  color: white;
  padding: 20px;
  width: 60%;
  margin: 30px auto;
`;

export const OptionButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const OptionButton = styled.div<{ $IsColor: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${(props) => (props.$IsColor ? "#ffc000" : "white")};
  width: 170px;
  height: 120px;
  margin: 8px;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 20px ${(props) => (props.$IsColor ? "#ffc000" : "white")};
    transition: 0.2s;
  }
`;

export const ReplayButton = styled.div`
  position: absolute;
  bottom: 10%;
  left: 41%;
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
  `;

export const FinishButton = styled(ReplayButton)`
  left: 59%;
  background-color: #ffae00;
  
`

export const ResultBox = styled.img`
  width: 60%;
  height: 40%;
  `;