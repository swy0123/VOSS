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

export const BadgeContentDesign = styled.div`
  margin: 0 auto;
  display: flex;
  /* justify-content: space-evenly; */
  flex-wrap: wrap;
  overflow: auto;
  width: 95%;
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
  /* border: solid 1px red; */
  `;

export const BadgeItemDesign = styled.div`
  border: solid 1px red;
  /* margin-right: auto; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 24%;
  aspect-ratio: 1/1;
  /* height: 24%; */
  img {
    height : 50%;
    aspect-ratio: 1/1;
    /* width: 50px; */
  };
`;

export const BadgeHoverDesign = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-in-out;
  width: 10vw;
  height: 5vw;
  text-align: center;
  line-height: 5vw;
  background-color: rgba(1, 1, 1, 0.1);
  color: white;
  padding: 10px;
  border-radius: 8px;
  `;

export const BadgeBoxContent = styled.div`
  font-weight: bold;
  font-size: 1.3vw;

  ${({$hoverActive}) =>
  $hoverActive > 0
    ? "animation-duration: 1.5s; animation-name: fadeout;"
    : "animation-duration: 4s; animation-name: fadeoutslow;"}

  @keyframes fadeout {
    0% {
      top: 120%;
      opacity: 0;
    }
    100% {
      opacity: 1;
      top: 100%;
    }
  };
  @keyframes fadeoutslow {
    0% {
      top: 120%;
      opacity: 0;
    }
    100% {
      opacity: 1;
      top: 100%;
    }
  };
`