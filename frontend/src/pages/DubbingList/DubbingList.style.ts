import { styled } from "styled-components";

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
  height: 88%;
  margin-top: 20px;
`

export const DubbingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 81%;
  margin-left: 3%;
`