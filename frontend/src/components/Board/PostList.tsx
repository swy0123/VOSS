import { styled } from "styled-components";

const PostNumberDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 10%;
  border: solid 2px red;
  /* text-align: center; */
`;

const PostTitleDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  border: solid 2px red;
  text-align: center;
`;

const PostUserDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 10%;
  border: solid 2px red;
  text-align: center;
`;

const PostCreatedatDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  border: solid 2px red;
  text-align: center;
`;



function PostList({ key, title, content }: { key: number; title: string; content: string }) {
  return(
    <div style={{display: "flex", width: "100%", fontSize: "1vw"}}>
        <PostNumberDesign>{key}</PostNumberDesign>
        <PostTitleDesign>{title}</PostTitleDesign>
        <PostUserDesign>user</PostUserDesign>
        <PostCreatedatDesign>created_at</PostCreatedatDesign>
    </div>
  )
}
export default PostList