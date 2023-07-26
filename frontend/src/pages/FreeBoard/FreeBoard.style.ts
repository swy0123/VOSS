import { styled } from "styled-components";


const FreeBoardDesign = styled.div`  
  margin-left: 7%;
  color: white;
`;

const DropdownDesign = styled.div`
  display: flex;
  justify-content: end;
  width: 85vw;
  height: 5vh;
  font-size: 0.8vw;
  text-align: center;
  border: solid 1px white;
`;

const OrderSelectDesign = styled.select`
  display: flex;
  height: 80%;
  align-self: center;
  width: 7vw;
  /* border: dotted 1px yellow; */
  `;

const PostListDesign = styled.div`
  display: flex;
  width: 85vw;
  height: 5vh;
  font-size: 0.8vw;
  text-align: center;
  border: solid 1px white;
`;

const PostNumberDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8%;
  text-align: center;
  /* border: solid 2px red; */
`;

const PostTitleDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 62%;
  text-align: center;
  /* border: solid 2px red; */
`;

const PostUserDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 10%;
  text-align: center;
  /* border: solid 2px red; */
`;

const PostCreatedatDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  text-align: center;
  /* border: solid 2px red; */
`;

const SearchboxDesign = styled.div`
  display: flex;
  justify-content: end;
  width: 85vw;
  height: 5vh;
  border: solid 1px white;
`;

const SearchSelectDesign = styled.select`
  display: flex;
  width: 7vw;
  height: 80%;
  align-self: center;
  margin-right: 1vw;
  `;

const InputBoxDesign = styled.form`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 14vw;
  height: 80%;
  border: solid 1px white;
  font-size: 0.8vw;
  background-color: black;
  border-radius: 10px;
  /* border: solid 1px red; */
`;

const InputBoxIpt = styled.input`
  display: flex;
  width: 10vw;
  color: white;
  background-color: black;
  border: none;
  border-radius: 10px;
  outline: none;
`;

const InputBoxBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3vw;
  background-color: black;
  border: none;
  border-radius: 10px;
`;

const CreateSpaceDesign = styled.div`
  display: flex;
  height: 80%;
  align-self: center;
  justify-content: end;
  width: 26vw;
  /* border: dotted 1px yellow; */
  `;

const CreateBtnDesign = styled.div`
  margin-right: 1vw;
  display: flex;
  height: 80%;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 80%;
  border: solid 1px white;
  border-radius: 10px;
  font-size: 0.8vw;
  `;


export {
    FreeBoardDesign,
    DropdownDesign,
    OrderSelectDesign,
    PostListDesign,
    PostNumberDesign,
    PostTitleDesign,
    PostUserDesign,
    PostCreatedatDesign,
    SearchboxDesign,
    SearchSelectDesign,
    InputBoxDesign,
    InputBoxIpt,
    InputBoxBtn,
    CreateSpaceDesign,
    CreateBtnDesign,
}