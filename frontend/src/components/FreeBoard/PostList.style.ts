import { styled } from "styled-components";


const PostListDesign = styled.div`
  display: flex;
  width: 80vw;
  height: 5.3vh;
  font-size: 0.8vw;
  /* border: solid 1px white; */
  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
  `;

const PostNumberDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8%;
  text-align: center;
  /* border: solid 2px red; */
  &:hover {
    text-decoration: underline;
  }
  `;

const PostTitleDesign = styled.div`
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 55%;
  font-size: 0.9vw;
  text-align: start;
  /* border: solid 2px red; */
  &:hover {
    text-decoration: underline;
  }
  `;

const PostUserDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 12%;
  text-align: center;
  /* border: solid 2px red; */
  &:hover {
    text-decoration: underline;
  }
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