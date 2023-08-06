import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FreeBoardCommentCountState } from "/src/recoil/Community";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import { getPost, deletePost, postLike } from "/src/api/FreeBoard";
import { PostType } from "/src/type/FreeBoard";
import CommentList from "/src/components/FreeBoard/CommentList/CommentList";
import ProfileImg from "/src/assets/Header/profile_tmp.png";
import PostHitImg from "/src/assets/FreeBoard/PostHit.png";
import PostComment from "/src/assets/FreeBoard/PostComment.png";
import PostLikeImg from "/src/assets/FreeBoard/PostLike.png";
import LikeItImg from "/src/assets/FreeBoard/LikeIt.png"
import { 
  DetailScrollDesign,
  PostDetailDesign,
  DetailTitleUserDesign,
  DetailTitleDesign,
  DetailUserDesign,
  DetailInfoDateDesign,
  DetailInfoDesign,
  DetailDateDesign,
  DetailContentDesign,
  DetailLikeRowDesign,
  DetailLikeNumDesign,
  DetailLikeDesign,
  DetailFilesDesign,
  DetailUpdateDeleteDesign,
  DetailUpdateDesign,
  DetailDeleteDesign,
  DetailIndexDesign,
 } from "./PostDetail.style";


function PostDetail() {
  const navigate = useNavigate();
  const id = parseInt(useParams().id || "");
  const [post, setPost] = useState<PostType>({});
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const commentCount = useRecoilValue<number>(FreeBoardCommentCountState);
  
  const goFreeBoard = () => navigate("/freeboard");
  const goUpdate = () => (navigate(`/freeboard/update/${id}`));
  const DeletePost = () => (deletePost(id), navigate("/freeboard"))
  const LikePost = () => {
    postLike(id).then((dataLikes)=> {
      if (dataLikes) {
        if (liked) { setLikes(likes-1)} 
        else {setLikes(likes+1)}
        setLiked(!liked)
      }
    })
  }

  useEffect(() => {
    getPost(id).then((dataPost) => {
      if (dataPost) {
        setPost(dataPost)
        setLikes(dataPost.likes)
        setLiked(dataPost.liked)
      }
    })
  }, [id])

  return (
    <BackGroundImg>
    <Header/> 
    <DetailScrollDesign>
    <PostDetailDesign>

      <DetailTitleUserDesign>
        <DetailTitleDesign>{post.title}</DetailTitleDesign>
        <DetailUserDesign>
          <img style={{marginRight: '1vw', height: '5vh'}} src={ProfileImg} alt="profileImg"/>
          {post.nickname}
        </DetailUserDesign>
      </DetailTitleUserDesign>

      <DetailInfoDateDesign>
        <DetailInfoDesign>
          <img style={{height: '2.5vh', marginLeft: '1vw'}} src={PostHitImg} alt="PostHit" /><span style={{marginLeft: '0.5vw'}}/>{post.hits}
          <img style={{height: '2.5vh', marginLeft: '2vw'}} src={PostComment} alt="PostComment" /><span style={{marginLeft: '0.5vw'}}/>{commentCount} 
          <img style={{height: '2.5vh', marginLeft: '2vw'}} src={PostLikeImg} alt="PostLikeimg" /><span style={{marginLeft: '0.5vw'}}/>{likes}
        </DetailInfoDesign>
        <DetailDateDesign>
          {post.createdAt?.slice(0, 10)} {post.createdAt?.slice(11, 16)}
        </DetailDateDesign>
      </DetailInfoDateDesign>

      <DetailContentDesign>{post.content}</DetailContentDesign>
      
      <DetailLikeRowDesign onClick={LikePost}>
        <DetailLikeNumDesign>{likes}</DetailLikeNumDesign>
        <DetailLikeDesign>{ liked ? <img src={LikeItImg} alt="LikeIT"/> : <img src={PostLikeImg} alt="PostLikeimg"/>}</DetailLikeDesign>
      </DetailLikeRowDesign>

      <DetailFilesDesign onClick={()=>alert("개발예정입니다")}>첨부파일</DetailFilesDesign>

      <DetailUpdateDeleteDesign>
        <DetailUpdateDesign onClick={goUpdate}>글 수정</DetailUpdateDesign>
        <DetailDeleteDesign onClick={DeletePost}>삭제</DetailDeleteDesign>
      </DetailUpdateDeleteDesign>

      <DetailIndexDesign onClick={goFreeBoard}>목록으로</DetailIndexDesign>

      <CommentList/>

      <br/><br/><br/>
    
    </PostDetailDesign>
    </DetailScrollDesign>
    <Messenger/>
    </BackGroundImg>
  );
};

export default PostDetail;