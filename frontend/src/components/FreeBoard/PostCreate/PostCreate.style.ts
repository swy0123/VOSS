import { styled } from "styled-components";

export const CreateScrollDesign = styled.div`
  font-size: 14px;
  margin-top: -15px;
  width: 100vw;
  height: 90vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  `;

export const CreatePostDesign = styled.div`
  margin-top: 10vh;
  margin-left: 15vw;
  width: 70vw;
  color: #efefef;
  /* border: solid 1px white; */
  `;

export const CreateTitleUserDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 12vh;
  border-bottom: solid 1px #dedede;
  `;

export const CreateTitleDesign = styled.input`
  display: flex;
  align-items: center;
  width: 55vw;
  height: 5vh;
  color: #efefef;
  background-color: transparent;
  // <h3> 태그 속성
  font-size: 19px;
  font-weight: bold;
  border: none;
  /* border: solid 2px red; */
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const CreateUserDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 15vw;
  height: 5vh;
  color: #a4a4a4;
  /* border: solid 2px red; */
  text-decoration: underline;
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
  border: none;
  /* border: solid 1px yellow; */
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  `;

export const CreateUploadFilesDesign = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 70vw;
  height: 10vw;
  /* border: solid 1px yellowgreen; */
`;

export const CreateFilesDesign = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 65vw;
  flex-wrap: wrap;
  /* border: solid 1px white; */
`;

export const CreateFileDesign = styled.div`
  background-color: rgba(255, 255, 255, 0.21); 
  padding: 5px 10px;
  margin: 5px;
`;


export const CreateUploadDesign = styled.div`
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

export const CreateCreateRowDesign = styled.div`
  display: flex;
  align-items: center;
  width: 70vw;
  height: 9vh;
  border-bottom: solid 1px #dedede;
  `;

export const CreateCreateDesign = styled.div`
  margin-right: 1vw;
  text-align: center;
  padding: 0.4vw 0.8vw;
  font-size: 0.9vw;
  font-weight: bold;
  border-radius: 20px;
  color: black;
  background-color: white;
  border: solid 1px #dedede;
  `;

export const CreateIndexRowDesign = styled.div`
  width: 70vw;
  height: 10vh;
`;

export const CreateIndexDesign = styled.div`
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

