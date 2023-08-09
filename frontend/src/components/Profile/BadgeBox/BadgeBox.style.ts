import { styled } from "styled-components";


export const BadgeBoxDesign = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 300px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10%;
  /* border: solid 1px red; */
`;

export const BadgeTitleDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 17px;
  width: 360px;
  height: 60px;
  color: white;
  /* border: dotted 1px white; */
`;

export const BadgeContentDesign = styled.div`
  margin-top: 10px;
  display: flex;
  /* justify-content: space-evenly; */
  flex-wrap: wrap;
  overflow: auto;
  width: 320px;
  height: 230px;
  color: white;
  /* border: dotted 1px white; */
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 6px;
    /* background: rgba(255, 255, 255, 0.4); */

  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
  }
  `;

export const BadgeItemDesign = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 104px;
  height: 75px;
  /* border: dotted 1px white; */
  img {
    height : 50px;
    width: 50px;
    /* border: dotted 1px white; */
  };
  span {
    font-weight: bold;
    /* border: dotted 1px white; */
  }
`;

export const BadgeHoverDesign = styled.div`
  display: flex;
  /* justify-content: space-evenly; */
  flex-wrap: wrap;
  overflow: auto;
  width: 320px;
  height: 240px;
  color: white;
  border: dotted 1px white;
  &::-webkit-scrollbar {
    display: none;
  }
  `;
