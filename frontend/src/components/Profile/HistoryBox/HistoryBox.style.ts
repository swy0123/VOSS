import { styled } from "styled-components";


export const HistoryBoxDesign = styled.div`
  /* border: solid 1px red; */
  width: 23vw;
  height: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10%;
`;

export const HistoryTitleDesign = styled.div`
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

export const HistoryContentDesign = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80%;
  color: white;
  img {
    height: 100%;
  }
`;