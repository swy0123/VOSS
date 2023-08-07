import { styled } from "styled-components";

export const UpdateScrollDesign = styled.div`
  font-size: 14px;
  margin-top: -15px;
  width: 100vw;
  height: 90vh;
  border: solid 2px red;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  `;

export const UpdatePostDesign = styled.div`
  /* margin-top: 10vh; */
  margin-left: 15vw;
  width: 70vw;
  color: #efefef;
  border: solid 1px white;
  `;

export const UpdateTitleUserDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 7vh;
  border: solid 2px red;
  `;

export const UpdateTitleDesign = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 7vh;
  color: #efefef;
  background-color: transparent;
  // <h3> 태그 속성
  font-size: 19px;
  font-weight: bold;
  border: solid 2px red;
  `;

export const UpdateUserDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  height: 7vh;
  border: solid 2px red;
  `;

export const UpdateInfoDateDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 7vh;
  border: solid 1px red;
  `;

export const UpdateInfoDesign = styled.div`
  display: flex;
  align-items: center;
  width: 55vw;
  height: 7vh;
  border: solid 1px red;
  `;

export const UpdateDateDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  height: 7vh;
  border: solid 1px red;
  `;

export const UpdateContentDesign = styled.textarea`
  color: white;
  resize: none;
  overflow: hidden;
  height: auto;
  background-color: transparent;
  padding: 50px 30px 50px;
  width: calc(70vw - 60px);
  height: 130px;
  border: solid 1px yellow;
  `;

export const UpdateFilesDesign = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 65vw;
  border: solid 1px green;
  flex-wrap: wrap;
`;

export const UpdateFileDesign = styled.div`
  border: solid 1px yellowgreen;
  margin: 5px;
`;

export const UpdateUploadDesign = styled.div`
  border: solid 1px green;
  width: 7vw;
  height: 5vh;
  margin-left: 2.5vw;
  text-align: center;
  line-height: 5vh;
  label {
    width: 100%;
    height: 100%;
  }
`;

export const UpdateIndexRowDesign = styled.div`
  width: 70vw;
  height: 10vh;
  border: solid 1px orange;
`;

export const UpdateIndexDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 7vw;
  height: 5vh;
  border: solid 1px orange;
`;

export const UpdateUpdateDeleteDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 70vw;
  height: 9vh;
  border: solid 1px yellow;
`;

export const UpdateUpdateDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 5vh;
  border: solid 1px yellow;
  `;

export const UpdateDeleteDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 5vh; 
  border: solid 1px yellow;
`;