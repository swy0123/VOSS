import { styled } from 'styled-components';

export const Container = styled.div<{$isClicked?: boolean}>`
  display: flex;
  justify-content: center;
  /* background-color: gray; */
  height: ${props => props.$isClicked ? '27%': '87%'};
  overflow: hidden;
  margin: 0;
`;

export const BottomSection = styled.div<{$isClicked?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(68, 68, 68,0.5);
  border-radius: 20px;
  height:65%;
  margin: 0px 5%;
`;
export const ClosedBottomSection = styled.div<{$isClicked?: boolean}>`
  height:6%;
  display: flex;
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


export const BottomBar = styled.div`
  height:100%;
  width: 90%;
  border-radius: 15px;
  background-color: #6C6C6C;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center;

`;

export const CloseSectionBtn = styled.img`
  margin: 0 auto;
  width: 60px;
  height: 30px;
`;

export const UnderBack = styled.div`
  position: fixed;
  background-color: #202124;
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;