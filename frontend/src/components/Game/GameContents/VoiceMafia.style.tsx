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

export const PlayExplain = styled.div`
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
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  color: white;
  padding: 20px;
  width: 60%;
  margin: 60px auto;
`;

export const OptionButtonContainer = styled.div`
  display: flex; /* 가로 정렬을 위해 플렉스 컨테이너로 설정 */
  flex-direction: row; /* 가로 방향으로 정렬 */
  flex-wrap: wrap; /* 컨테이너의 크기를 넘어갈 경우 줄바꿈 */
  justify-content: center; /* 가로 방향 가운데 정렬 */
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
  font-size: 16px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 20px ${(props) => (props.$IsColor ? "#ffc000" : "white")};
    transition: 0.2s;
  }
`;

