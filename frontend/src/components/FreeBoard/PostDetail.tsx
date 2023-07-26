import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackGroundImg } from "../BackGroundImg";
import Header from "../Header/Header";
import Messenger from "../Message/Messenger";
// recoil
import { useRecoilState } from "recoil";
import { PostListState, PostListNum } from "../../states/atom";
// style
  import {
  PostDetailDesign
} from "./PostDetail.style";



function PostDetail() {
  const navigate = useNavigate() 
  const goFreeBoard = () => {navigate("/freeboard")}
  const UpdatePost = () => {navigate(`/freeboard/update/${id}`)}

  const [posts, setPosts] = useRecoilState(PostListState);
  const [num, setNum]= useRecoilState(PostListNum);
  const id = parseInt(useParams().id);
  const detail = posts.filter(post => post.id == id);
  const DeletePost = () => {
    const newposts = posts.filter(item => item.id !== id);
    setPosts(newposts);
    goFreeBoard();
  }

  return (
    <BackGroundImg>
    <Header/>
    <PostDetailDesign>
    <br/>
    <h3>{detail[0].title}</h3>
    <hr/>
    <div>{detail[0].content}</div>
    <br/>
    <div><button onClick={() => UpdatePost(id)}>수정하기</button></div>
    <br/>
    <div><button onClick={() => DeletePost()}>삭제하기</button></div>
    </PostDetailDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default PostDetail;