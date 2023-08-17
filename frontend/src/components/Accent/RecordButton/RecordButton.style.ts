import { styled, keyframes } from "styled-components";

export const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 42px;
  height: 145px;
  width: 350px;

`;
export const StopWatch = styled.p`
  display: flex;
  justify-content: space-between;
  color: white;
  height: 20px;
  width: 115px;
  margin: 0px;

`;
export const State = styled.div<{ $practiceStart?: boolean }>`
  background-color: rgba(58, 58, 58, 0.7);
  border-radius: 4px;
  border: 0.5px solid white;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  height: 24px;
  width: 75px;
  color: white;
`;
export const PracticeStart = styled(State)<{ $practiceStart?: boolean }>`
  display: ${(props) => (props.$practiceStart ? "block" : "none")};
`;
export const PracticeEnd = styled(State)<{ $practiceEnd?: boolean }>`
  display: ${(props) => (props.$practiceEnd ? "block" : "none")};
`;

export const SectionBtn = styled.div<{ $IsRunning: boolean }>`
  display: flex;
  align-items: center;
  height: 70px;
  z-index: ${(props) => (props.$IsRunning ? 500 : 0)};
  /* pointer-events: ${(props) => (props.$IsRunning ? "auto" : "none")}; */
`;

export const Button = styled.button`
  background-color: #3a3a3a;
  border-radius: 16px;
  border: none;
  color: white;
  font-size: 16px;
  height: 30px;
  width: 50px;
  cursor: pointer;
`;

export const RestartBtn = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;
export const CompleteBtn = styled.img`
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

export const RecordBtn = styled.img`
  width: 100px;
  cursor: pointer;
`;

export const NowRecording = styled.div`
  height: 100px;
  width: 100px;
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
    margin: -79px 0px 0px 24px;
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

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
`;
