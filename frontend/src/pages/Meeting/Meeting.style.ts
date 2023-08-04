import { styled } from 'styled-components';

export const Container = styled.div<{$isClicked?: boolean}>`
  display: flex;
  justify-content: center;
  background-color: gray;
  height: ${props => props.$isClicked ? '30%': '90%'};
`;

export const BottomSection = styled.div<{$isClicked?: boolean}>`
  display: flex;
  height: ${props => props.$isClicked ? '70%': '10%'};
  background-color: red;
`;
