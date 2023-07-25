import { styled } from "styled-components";
import { BackGroundImg } from "../components/BackGroundImg";
import Header from "../components/Header/Header";
import Messenger from "../components/Message/Messenger";
import PostList from "../components/Board/PostList";
import { useState } from "react";

const FreeBoardDesign = styled.div`  
  margin-left: 7%;
  color: white;
`;

const PostListDesign = styled.div`
  display: flex;
  width: 85vw;
  height: 6vh;
  border: solid 1px white;
  text-align: center;
  font-size: 0.8vw;
`;

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

interface Post {
  id: number,
  title: string,
  content: string
}

const Tmp: Post[] = [
  {id: 1,
  title: "쏠 수 있어 ㅓ ㅓ ~!~!~ ㅓ!~!~!~!",
  content: "첫째 내용"},
  {id: 2,
  title: "쏠 수 있어 ㅓ ㅓ ~!~!~ ㅓ!~!~!~!",
  content: "둘째 내용"},
  {id: 3,
    title: "너네 이거 따라할 수 있음?",
    content: "셋째 내용"},
  {id: 4,
  title: "아는 형님의 아는 누나의 아는 외숙모의 아는 삼촌이요",
  content: "넷째 내용"}
]


function FreeBoard () {
  const [posts, setPosts] = useState<Post[]>(Tmp);

  return(
    <BackGroundImg>
      <Header/>
      <FreeBoardDesign>
      <h3>자유 게시판!!</h3>
      <div>
      <PostListDesign>
        <PostNumberDesign>글 번호</PostNumberDesign>
        <PostTitleDesign>제목</PostTitleDesign>
        <PostUserDesign>작성자</PostUserDesign>
        <PostCreatedatDesign>작성일</PostCreatedatDesign>
      </PostListDesign>
      {posts.map(post => (
      <PostListDesign>
        <PostList key={post.id} title={post.title} content={post.content} />
      </PostListDesign>
      ))}
      </div>
      </FreeBoardDesign>
      <Messenger/>
    </BackGroundImg>
  )
}
export default FreeBoard;