import { styled } from "styled-components";


export const BadgeBoxDesign = styled.div`
  /* border: solid 1px red;   */
  position: relative;
  width: 27vw;
  height: 22vw;
  /* height: 100%; */
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
`;

export const BadgeTitleDesign = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2.2vh;
  width: 100%;
  height: 20%;
  color: white;
  `;

export const BadgeTitleDetailDesign = styled.div`
  /* border: dotted 1px white; */
  font-size: 0.8vw;
  /* display: 'flex'; */
  text-align: end;
  position: absolute;
  /* margin-right: 2vw; */
  opacity: 0.6;
  width: 24vw;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const BadgeTopPaddingDetailDesign = styled.div`
  /* border: dotted 1px white; */
  width: 100%;
  height: 5%;
  `;

export const BadgeContentDesign = styled.div`
  /* border: solid 1px red; */
  margin: 0 auto;
  padding: 0 1.5vw;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  width: 24vw;
  height: 70%;
  color: white;
  cursor: pointer;
  &::-webkit-scrollbar {
    width: 0.4vw;
    border-radius: 6px;
    
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
  }
  `;

export const BadgeItemDesign = styled.div`
  /* border: solid 1px red; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 5.9vw;
  height: 5.9vw;
  img {
    cursor: pointer;
    width: 50%;
    aspect-ratio: 1/1;
  };
`;


export const BadgeBoxContent = styled.div<{$hoverActive: number}>`
  /* border: solid 1px red; */
  font-weight: bold;
  text-align: center;
  font-size: 0.9vw;

  ${({$hoverActive}) => $hoverActive > 0
    ? "animation-duration: 1s; animation-name: fadeout;"
    : null};

  @keyframes fadeout {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  };
`;

export const BadgeBoxContent2 = styled.div`
  /* border: solid 1px red; */
  font-weight: bold;
  text-align: center;
  font-size: 0.9vw;
`;