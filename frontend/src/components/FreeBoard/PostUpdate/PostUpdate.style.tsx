import { styled } from "styled-components";

export const UpdateScrollDesign = styled.div`
  font-size: 14px;
  margin-top: -15px;
  width: 100vw;
  height: 90vh;
  /* border: solid 2px red; */
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  `;

export const UpdatePostDesign = styled.div`
  margin-top: 10vh;
  margin-left: 15vw;
  width: 70vw;
  color: #efefef;
  /* border: solid 1px white; */
  `;

export const UpdateTitleUserDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 5vh;
  /* border: solid 2px red; */
  `;

export const UpdateTitleDesign = styled.input`
  display: flex;
  align-items: center;
  width: 55vw;
  height: 5vh;
  // <h3> 태그 속성
  font-size: 19px;
  font-weight: bold;
  color: #efefef;
  background-color: transparent;
  border: none;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  `;

export const UpdateUserDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 15vw;
  height: 5vh;
  color: #a4a4a4;
  /* border: solid 2px red; */
  text-decoration: underline;
  `;

export const UpdateInfoDateDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 7vh;
  border-bottom: solid 1px #dedede;
  `;

export const UpdateInfoDesign = styled.div`
  display: flex;
  align-items: center;
  width: 55vw;
  height: 5vh;
  /* border: solid 1px red; */
  `;

export const UpdateDateDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 15vw;
  height: 5vh;
  color: #a4a4a4;
  /* border: solid 1px red; */
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
  /* border: solid 1px yellow; */
  border: none;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  `;

export const UpdateFilesDesign = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 65vw;
  flex-wrap: wrap;
  /* border: solid 1px white; */
`;

export const UpdateFileDesign = styled.div`
  background-color: rgba(255, 255, 255, 0.21); 
  padding: 5px 10px;
  margin: 5px;
`;

export const UpdateUploadDesign = styled.div`
  /* width: 5vw;
  height: 4vh; */
  padding: 0 0.4vw;
  margin-right: auto;
  margin-left: 3vw;
  text-align: center;
  line-height: 4vh;
  font-size: 0.9vw;
  border: solid 1px white;
  label {
    width: 100%;
    height: 100%;
  }
`;

export const UpdateIndexDesign = styled.div`
  margin-right: 1vw;
  text-align: center;
  line-height: 4vh;
  margin-left: auto;
  width: 5.5vw;
  height: 4vh;
  background-color: rgba(34, 80, 91, 0.7);
  border-radius: 15px;
  font-size: 0.8vw;
`;

export const UpdateUpdateDeleteDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 70vw;
  height: 9vh;
  border-bottom: solid 1px #dedede;
`;

export const UpdateUpdateDesign = styled.div`
  margin-right: 1vw;
  text-align: center;
  line-height: 3.5vh;
  width: 4vw;
  height: 3.5vh;
  font-size: 0.75vw;
  font-weight: bold;
  border-radius: 50px;
  color: black;
  background-color: white;
  border: solid 1px white;
  `;

export const UpdateDeleteDesign = styled.div`
  margin-right: 1vw;
  text-align: center;
  line-height: 3.5vh;
  width: 4vw;
  height: 3.5vh;
  font-size: 0.75vw;
  font-weight: bold;
  border-radius: 50px;
  color: white;
  background-color: transparent;
  border: solid 1px white;
`;