import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackGroundImg } from "../../BackGroundImg";
import Header from "../../Header/Header";
import Messenger from "../../Message/Messenger";
import { getPost, deletePost } from "/src/api/FreeBoard";
import { 
  PostDetailDesign, 
  DetailTitleDesign,
  DetailInfoBoxDesign,
  DetailInfoDesign,
  DetailUserDesign,
  DetailContentDesign
 } from "./PostDetail.style";
// import { PostDetailType } from "/src/type/Auth";


function PostDetail() {
  const navigate = useNavigate() 
  const id = parseInt(useParams().id || "");
  const [post, setPost] = useState({});
  const UpdatePost = () => {navigate(`/freeboard/update/${id}`)};
  const DeletePost = () => {deletePost(id), navigate("/freeboard")}

  useEffect(() => {
    getPost(id).then((dataPost) => {
      if (dataPost) {
        setPost(dataPost)
      }
    })
  }, [id])

  return (
    <BackGroundImg>
    <Header/>
    <PostDetailDesign>

      <DetailTitleDesign>
        <h3>{post.title}</h3>
      </DetailTitleDesign>

      <DetailInfoBoxDesign>
        <DetailInfoDesign>
          <img style={{height: '2.5vh', marginLeft: '1vw'}} src="/src/assets/PostHit.png" alt="" /><span style={{marginLeft: '0.5vw'}}/>{post.hits}
          <img style={{height: '2.5vh', marginLeft: '1vw'}} src="/src/assets/PostComment.png" alt="" /><span style={{marginLeft: '0.5vw'}}/>3
          <img style={{height: '2.5vh', marginLeft: '1vw'}} src="/src/assets/PostLike.png" alt="" /><span style={{marginLeft: '0.5vw'}}/>{post.likes}
        </DetailInfoDesign>
        <DetailUserDesign>
          <img style={{marginRight: '1vw', height: '5vh'}} src="/src/assets/Header/profile_tmp.png" alt="profileImg"/>
          {post.nickname}
          {` | ${post.createdAt?.slice(0, 10)} ${post.createdAt?.slice(11, 16)}`}
        </DetailUserDesign>
      </DetailInfoBoxDesign>
     
      <DetailContentDesign>
        <div>{post.content}</div>
      </DetailContentDesign>

      <button onClick={() => UpdatePost()}>수정하기</button>
      <button onClick={() => DeletePost()}>삭제하기</button>
    </PostDetailDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default PostDetail;