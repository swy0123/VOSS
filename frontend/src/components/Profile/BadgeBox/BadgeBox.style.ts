import { styled } from "styled-components";


export const BadgeBoxDesign = styled.div`
  position: relative;
  width: 30vw;
  height: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  /* border: solid 1px red; */
`;

export const BadgeTitleDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2.2vh;
  width: 100%;
  height: 20%;
  color: white;
  /* border: dotted 1px white; */
  `;

export const BadgeTitleDetailDesign = styled.div`
  /* display: 'flex'; */
  text-align: end;
  position: absolute;
  font-size: 1vh;
  margin-left: 20.5vw;
  opacity: 0.6;
  width: 7vw;
  /* border: dotted 1px white; */
  &:hover {
    opacity: 0.8;
  }
`;

export const BadgeContentDesign = styled.div`
  /* border: solid 1px red; */
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  width: 28vw;
  height: 79%;
  color: white;
  &::-webkit-scrollbar {
    width: 6px;
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
  width: 8.9vw;
  height: 8.9vw;
  img {
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
    ? "animation-duration: 1.5s; animation-name: fadeout;"
    : "animation-duration: 2.2s; animation-name: fadeoutslow;"};

  @keyframes fadeout {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  };
  @keyframes fadeoutslow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  };
`