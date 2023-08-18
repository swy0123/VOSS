import { styled } from "styled-components";


export const ProfileScrollDesign = styled.div`
  width: 100vw;
  height: calc(100vh - 65px);
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
  height: 90vh;
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

export const ProfileSpace3 = styled.div`
  /* border: dotted 1px white; */
  display: flex;
  justify-content: space-evenly;
  height: 3vh;
  width: 100%;
`;

export const BoardDataDesign = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2.5vw;
  width: 24.5vw;
  height: 3.5vw;
  color: white;
  font-size: 1.1vw;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`;

export const BadgeTitleDetailDesign = styled.div`
  /* border: solid 1px red; */
  margin-left: auto;
  padding-right: 3vw; 
  font-size: 0.8vw;
  text-align: end;
  line-height: 3.5vw;
  opacity: 0.6;
  width: 5vw;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;