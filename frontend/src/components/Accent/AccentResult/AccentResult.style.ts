import { styled } from 'styled-components';

export const ResultBox = styled.div`
  background-color: #2E2E2E;
  border-radius: 8px;
  margin-top: 10px;
  width: 450px;
  height: 200px;
`

export const Text = styled.div`
  font-size: 16px;
  color: white;
  padding: 20px 0px 25px 20px;
  width: 400px;
  height: 135px;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    display: none;
  }
`