import { styled } from "styled-components";


const PostListDesign = styled.div`
  display: flex;
  width: 85vw;
  height: 5vh;
  text-align: center;
  font-size: 0.8vw;
  /* border: solid 1px white; */
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


export {
    PostListDesign,
    PostNumberDesign,
    PostTitleDesign,
    PostUserDesign,
    PostCreatedatDesign
}