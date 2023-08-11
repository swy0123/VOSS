import { styled } from "styled-components";


export const HistoryBoxDesign = styled.div`
  width: 30vw;
  height: 100%;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  /* border: solid 1px red; */
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

export const HistoryDetailDesign = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: end;
  align-items: center;
  font-weight: bold;
  font-size: 2.2vh;
  width: 100%;
  height: 10%;
  color: white;
  `;

export const HistoryDetailIconDesign = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: end;
  align-items: center;
  color: white;
  height: 15%;
  width: 10%;
  `;

export const HistoryDetailNameDesign = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7vh;
  color: white;
  height: 100%;
  width: 18%;
`;

export const HistoryContentDesign = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  color: white;
  position: relative; /* 부모 컨테이너를 기준으로 하위 컴포넌트를 배치하기 위해 설정 */
  img {
    height: 100%;
  }
`;