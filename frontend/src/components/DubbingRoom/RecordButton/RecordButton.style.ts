import { styled, keyframes } from "styled-components";

export const RecordBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 42px;
  height: 150px;
  width: 350px;
`;
export const StopWatch = styled.div`
  color: white;
  margin: 20px 0px 5px 0px;
  height: 20px;

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
export const SectionBtn = styled.div<{ $IsClickable: boolean }>`
  display: flex;
  align-items: center;
  height: 60px;
  pointer-events: ${(props) => (props.$IsClickable ? "auto" : "none")};
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
export const RestartBtn = styled(Button)``;
export const CompleteBtn = styled(Button)``;

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
    margin: -79.2px 0px 0px 24.2px;
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

export const PreventClickDiv = styled.div`
  /* position: absolute;
  top: 150px; */
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 15px;
  height: 40px;
  width: 220px;
`;
export const MoonLoaderDiv = styled.div`
  /* background-color: red; */
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
  height: 100px;
  z-index: -1;
  /* top:50%;
  left: 50%;
  transform: translate(-50%, 0); */
`;

export const ParcticeStartSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  width: 100px;
`

export const ParcticeInfo = styled.div`
  color: #BABABA;
  width: 150px;
  text-align: center;
`