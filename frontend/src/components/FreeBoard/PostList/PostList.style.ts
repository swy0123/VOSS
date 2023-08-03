import { styled } from "styled-components";


export const PostListDesign = styled.div`
  /* border: solid 1px white; */
  display: flex;
  width: 80vw;
  height: 5.3vh;
  font-size: 0.8vw;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  `;

export const PostNumberDesign = styled.div`
  /* border: solid 2px red;  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8%;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
  `;

export const PostLikeDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  img {
    width: 25%;
    aspect-ratio: 1/1;
  }
  `;

export const PostTitleDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 4vw;
  // 5% = 4vw 
  width: 45%;
  font-size: 0.9vw;
  text-align: start;
  &:hover {
    text-decoration: underline;
  }
  `;

export const PostUserDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 12%;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

export const PostCreatedatDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  text-align: center;
`;

export const PostHitDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
`;