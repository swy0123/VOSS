import { styled, keyframes } from 'styled-components';

export const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 42px;
  height: 150px;
  width: 350px;
`
export const StopWatch = styled.p`
  color: white;
  margin: 20px 0px 20px 0px;
  height: 1px;
`
export const State = styled.div<{$practiceStart?: boolean}>`
  background-color: rgba(58, 58, 58, 0.7);
  border-radius: 4px;
  border: 0.5px solid white;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  height: 24px;
  width: 75px;
  color: white;
`
export const PracticeStart = styled(State)<{$practiceStart?: boolean}>`
  display: ${props => props.$practiceStart ? "block": 'none'};
`
export const PracticeEnd = styled(State)<{$practiceEnd?: boolean}>`
  display: ${props => props.$practiceEnd ? "block": 'none'};
`
export const SectionBtn = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`
export const Button = styled.button`
  background-color: #3a3a3a;
  border-radius: 16px;
  border: none;
  color: white;
  font-size: 16px;
  height: 30px;
  width: 50px;
  cursor: pointer;
`
export const RestartBtn = styled(Button)``
export const CompleteBtn = styled(Button)``

export const RecordBtn = styled.img`
  width: 100px;
  cursor: pointer;
`

export const NowRecording = styled.div`
  height: 100px;
  width: 100px;
`

const wave = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3.5);
    opacity: 0;
  }
`

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

  &::after{
    opacity: 0;
    -webkit-animation: ${wave} 3s 1.5s infinite linear;
            animation: ${wave} 3s 1.5s infinite linear;
  }
`