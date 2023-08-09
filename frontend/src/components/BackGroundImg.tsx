import styled from 'styled-components';

export const BackGroundImg = styled.div`
  position: fixed;
  background: url("/src/assets/BackGroundImg.png") no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;