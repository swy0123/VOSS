import { useEffect, useState } from "react";
import { BackGroundImg } from "../components/BackGroundImg";
import Header from "../components/Header/Header";
import Messenger from "../components/Message/Messenger";
import PostList from "../components/FreeBoard/PostList";
import SearchBox from "../components/FreeBoard/SearchBox";
import CreateBox from "../components/FreeBoard/CreateBox";
// bootstrap
// import OrderDropBtn from "../components/FreeBoard/OrderDropBtn";
// import 'bootstrap/dist/css/bootstrap.min.css';
// style
import {
  FreeBoardDesign,
  DropdownDesign,
  PostListDesign,
  PostNumberDesign,
  PostTitleDesign,
  PostUserDesign,
  PostCreatedatDesign,
  SearchboxDesign,
} from "./FreeBoard.style"


interface Post {
  id: number,
  title: string,
  content: string
}

const Tmp: Post[] = [
  {id: 1,title: "첫째 제목", content: "첫째 내용"},
  {id: 2, title: "둘째 제목", content: "둘째 내용"},
  {id: 3, title: "셋째 제목", content: "셋째 내용"},
  {id: 4, title: "넷째 제목", content: "넷째 내용"},
  {id: 5, title: "다섯째 제목", content: "다섯째 내용"},
  {id: 6, title: "여섯째 제목", content: "여섯째 내용"},
  {id: 7, title: "일곱째 제목", content: "일곱째 내용"},
  {id: 8, title: "여덟째 제목", content: "여덟째 내용"},
  {id: 9, title: "아홉째 제목", content: "아홉째 내용"},
  {id: 10, title: "열째 제목", content: "열째 내용"},
]


function FreeBoard () {
  // const [loading, setLoading] = useState(true);
  // const [posts, setPosts] = useState([]);
  // const getPosts = async () => {
  //   const json = await (
  //     await fetch(
  //       `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
  //     )
  //   ).json();
  //   console.log(json);
  //   // setPosts(json.data.posts);
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   getPosts();
  // }, []);
  
  const [posts, setPosts] = useState<Post[]>(Tmp);

  return(
    <BackGroundImg>
      <Header/>
      <FreeBoardDesign>
        <h3>자유 게시판</h3>
        <DropdownDesign>
        {/* <OrderDropBtn/> */}
        </DropdownDesign>
        <PostListDesign>
          <PostNumberDesign>글 번호</PostNumberDesign>
          <PostTitleDesign>제목</PostTitleDesign>
          <PostUserDesign>작성자</PostUserDesign>
          <PostCreatedatDesign>작성일</PostCreatedatDesign>
        </PostListDesign>
        {posts.map(post => (
        <PostListDesign>
          <PostList key={post.id} id={post.id} title={post.title}/>
        </PostListDesign>
        ))}
        <SearchboxDesign>
          <SearchBox/>
          <CreateBox/>
        </SearchboxDesign>
      </FreeBoardDesign>
      <Messenger/>
    </BackGroundImg>
  )
}

export default FreeBoard;