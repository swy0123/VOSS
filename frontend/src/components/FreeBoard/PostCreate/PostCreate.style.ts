import { styled } from "styled-components";

export const CreateScrollDesign = styled.div`
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

export const CreatePostDesign = styled.div`
  margin-left: 15vw;
  width: 70vw;
  color: #efefef;
  border: solid 1px white;
  `;

export const CreateTitleUserDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 20vh;
  border: solid 2px red;
  `;

export const CreateTitleDesign = styled.input`
  display: flex;
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

export const CreateUserDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  height: 7vh;
  border: solid 2px red;
  `;

export const CreateContentDesign = styled.textarea`
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

export const CreateUploadFilesDesign = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 70vw;
  height: 10vw;
  border: solid 1px yellowgreen;
`;


export const CreateFilesDesign = styled.div`
  margin: 0 auto;
  display: flex;
  width: 65vw;
  border: solid 1px green;
  flex-wrap: wrap;
  `;

export const CreateFileDesign = styled.div`
  border: solid 1px yellowgreen;
  margin: 5px;
  `;

export const CreateUploadDesign = styled.div`
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

export const CreateCreateRowDesign = styled.div`
  display: flex;
  align-items: center;
  width: 70vw;
  height: 10vh;
  border: solid 1px orange;
  `;

export const CreateCreateDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 7vw;
  height: 5vh;
  border: solid 1px orange;
  `;

export const CreateIndexRowDesign = styled.div`
  width: 70vw;
  height: 10vh;
  border: solid 1px orange;
`;

export const CreateIndexDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 7vw;
  height: 5vh;
  border: solid 1px orange;
  `;

