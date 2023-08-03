import { styled } from 'styled-components';

export const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px dashed #efefef;
  margin-top: 42px;
  height: 170px;
  width: 350px;
`
export const StopWatch = styled.p`
  color: white;
  margin: 40px 0px 20px 0px;
`
export const SectionBtn = styled.div`
  display: flex;
  align-items: center;
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