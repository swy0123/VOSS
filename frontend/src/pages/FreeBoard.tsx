import { useEffect, useState } from "react";
import { BackGroundImg } from "../components/BackGroundImg";
import Header from "../components/Header/Header";
import Messenger from "../components/Message/Messenger";
import PostList from "../components/FreeBoard/PostList";
import SearchBox from "../components/FreeBoard/SearchBox";
import CreateBox from "../components/FreeBoard/CreateBox";
// recoil
import { useRecoilState } from "recoil";
import { PostListState } from "../states/atom";
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
  
  const [posts, setPosts] = useRecoilState(PostListState);

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