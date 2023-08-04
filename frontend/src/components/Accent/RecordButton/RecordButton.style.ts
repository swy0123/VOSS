import { styled } from 'styled-components';

export const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #efefef;
  margin-top: 42px;
  height: 150px;
  width: 350px;
`
export const StopWatch = styled.p`
  color: white;
  margin: 25px 0px 20px 0px;
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
