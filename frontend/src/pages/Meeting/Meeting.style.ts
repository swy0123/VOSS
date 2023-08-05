import { styled } from 'styled-components';

export const Container = styled.div<{$isClicked?: boolean}>`
  display: flex;
  justify-content: center;
  background-color: gray;
  height: ${props => props.$isClicked ? '30%': '87%'};
  margin: 0;
`;

export const BottomSection = styled.div<{$isClicked?: boolean}>`
  height:62%;
  background-color: red;
  margin: 0;
`;
export const ClosedBottomSection = styled.div<{$isClicked?: boolean}>`
  height:6%;
  justify-content: center;
  align-items: center;
  text-align:center;
  margin: 0 auto;
`;

export const BottomBarImg = styled.img`
  height:100%;
  width: 90%;
  /* background-color: red; */
`;

export const MikeIcon = styled.img`
  height: 25px;
  width: 25px;
`;