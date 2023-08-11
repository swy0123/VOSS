import { styled } from "styled-components";


export const ProfileScrollDesign = styled.div`
  margin-top: -2px;
  width: 100vw;
  height: 90vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  /* border: solid 1px red; */
  `;

export const ProfileDesign = styled.div`
  /* border: dotted 1px yellow; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 4vh;
  margin-left: 15vw;
  margin-right: 15vw;
  height: 75vh;
  width: 70vw;
`;

export const ProfileSpace1 = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: center;
  height: 15vh;
  width: 100%;
  `;

export const ProfileSpace2 = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: space-evenly;
  height: 42vh;
  width: 100%;
`;