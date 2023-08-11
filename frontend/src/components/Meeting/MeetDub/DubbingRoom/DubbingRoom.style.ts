import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 100px;
  margin-top: 10px;
`

export const GoDubbingListBtn = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 490px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  background: rgba(34, 80, 91, 0.70);
`