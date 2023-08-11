import { styled } from "styled-components";

export const GameMainContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  border-radius: 30px;
  background-color: rgba(151, 151, 151, 0.1);
`;

export const GameMainText = styled.img`
  width: 350px;
  height: 250px;
`;

export const GameMainCneterDiv = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 300px;
`;

export const EnterButton = styled.div<{ $IsColor: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${(props) => (props.$IsColor ? "#ffc000" : "white")};
  width: 170px;
  height: 31px;
  margin: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 20px ${(props) => (props.$IsColor ? "#ffc000" : "white")};
    transition: 0.2s;
  }
`;

export const GameMainIcon = styled.img<{
  $Top: string;
  $Left: string;
  $Animation: boolean;
  $Duration?: string;
}>`
  position: absolute;
  top: ${(props) => props.$Top};
  left: ${(props) => props.$Left};
  width: 90px;
  height: 80px;

  ${(props) =>
    props.$Animation
      ? props.$Duration +
        "animation-name: vive; animation-iteration-count: infinite;"
      : ""}

  @keyframes vive {
    0% {
      transform: rotate(25deg);
    }
    50% {
      transform: rotate(-25deg);
    }
    100% {
      transform: rotate(25deg);
    }
  }
`;
