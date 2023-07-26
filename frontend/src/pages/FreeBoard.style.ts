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
  /* border: solid 1px white; */
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

export {
    FreeBoardDesign,
    DropdownDesign,
    PostListDesign,
    PostNumberDesign,
    PostTitleDesign,
    PostUserDesign,
    PostCreatedatDesign,
    SearchboxDesign,
}