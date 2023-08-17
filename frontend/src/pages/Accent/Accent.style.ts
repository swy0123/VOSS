import { styled } from 'styled-components';

export const OverflowHeaderHidden = styled.div`
  width: 100vw;
  height: calc(100vh - 65px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
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
`