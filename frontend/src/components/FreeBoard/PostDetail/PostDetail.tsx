import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FreeBoardCommentCountState } from "/src/recoil/Community";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import { getPost, deletePost, postLike } from "/src/api/FreeBoard";
import { PostType } from "/src/type/FreeBoard";
import CommentList from "/src/components/FreeBoard/CommentList/CommentList";
import PostHitImg from "/src/assets/FreeBoard/PostHit.png";
import PostComment from "/src/assets/FreeBoard/PostComment.png";
import PostLikeImg from "/src/assets/FreeBoard/PostLike.png";
import LikeItImg from "/src/assets/FreeBoard/LikeIt.png";
import downloadImg from "/src/assets/Training/download.png";
import {
  FreeScrollDesign,
  FreeMainDesign,
  FreeTitleUserDesign,
  FreeTitleDesign,
  FreeUserDesign,
  FreeInfoDateDesign,
  FreeInfoDesign,
  FreeDateDesign,
  FreeContentDesign,
  FreeLikeDesign,
  FreeLikeNumDesign,
  FreeLikeImageDesign,
  FreeFilesDesign,
  FreeFileDesign,
  FreepUdateDeleteDesign,
  FreeUpdateDesign,
  FreeDeleteDesign,
  FreedIexDesign,
} from "../FreeBoardDetail.style";

function PostDetail() {
  const navigate = useNavigate();
  const id = parseInt(useParams().id || "");
  const me = useRecoilValue(CurrentUserAtom).userid;
  const [post, setPost] = useState<PostType>({});
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [otherFiles, setOtherFiles] = useState([]);
  const commentCount = useRecoilValue<number>(FreeBoardCommentCountState);
  
  const goFreeBoard = () => navigate("/freeboard");
  const goUpdate = () => (navigate(`/freeboard/update/${id}`));
  const goProfile = () => (navigate(`/profile/${post.memberId}`));
  const DeletePost = () => {
    deletePost(id).then((res) => {
      if (res) {navigate("/freeboard")}
    })
  };
  const LikePost = () => {
    postLike(id).then((dataLikes)=> {
      if (dataLikes) {
        if (liked) { setLikes(likes-1)} 
        else {setLikes(likes+1)}
        setLiked(!liked)
      }
    })
  };

  useEffect(() => {
    getPost(id).then((dataPost) => {
      if (dataPost) {
        setPost(dataPost)
        setLikes(dataPost.likes)
        setLiked(dataPost.liked)
        setImageFiles(dataPost.imageFiles)
        setOtherFiles(dataPost.otherFiles)
      }
    })
  }, [id])

  return (
    <BackGroundImg>
    <Header/> 
    <FreeScrollDesign>
    <FreeMainDesign>

      <FreeTitleUserDesign>
        <FreeTitleDesign>{post.title}</FreeTitleDesign>
        <FreeUserDesign ><span onClick={goProfile}>{post.nickname}</span></FreeUserDesign>
      </FreeTitleUserDesign>

      <FreeInfoDateDesign>
        <FreeInfoDesign>
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostHitImg} alt="PostHit" /><span style={{marginLeft: '0.5vw'}}/>{post.hits}
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostComment} alt="PostComment" /><span style={{marginLeft: '0.5vw'}}/>{commentCount} 
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostLikeImg} alt="PostLikeimg" /><span style={{marginLeft: '0.5vw'}}/>{likes}
        </FreeInfoDesign>
        <FreeDateDesign>
          {post.createdAt?.slice(0, 10)} {post.createdAt?.slice(11, 16)}
        </FreeDateDesign>
      </FreeInfoDateDesign>

      <FreeContentDesign>{post.content}</FreeContentDesign>
      
      <FreeLikeDesign onClick={LikePost}>
        <FreeLikeNumDesign>{likes}</FreeLikeNumDesign>
        <FreeLikeImageDesign>{ liked ? <img src={LikeItImg} alt="LikeIT"/> : <img src={PostLikeImg} alt="PostLikeimg"/>}</FreeLikeImageDesign>
      </FreeLikeDesign>

      <FreepUdateDeleteDesign>
          { imageFiles.length || otherFiles.length
          ? <FreeFilesDesign>
            첨부파일 : 
            {imageFiles.map((file: any, index: number) => (
            <FreeFileDesign key={index}>
              {file.originalFileName}
              <img style={{height: '2vh', marginLeft: '1vw'}} src={downloadImg} alt="PostHit" />
            </FreeFileDesign>
            ))}
            {otherFiles.map((file: any, index: number) => (
              <FreeFileDesign key={index}>
              {file.originalFileName}
              <img style={{height: '2vh', marginLeft: '1vw'}} src={downloadImg} alt="PostHit" />
            </FreeFileDesign>
            ))}
          </FreeFilesDesign>
          : null
          }

        { post.memberId === me
          ? <>
          <FreeUpdateDesign onClick={goUpdate}>글 수정</FreeUpdateDesign>
          <FreeDeleteDesign onClick={DeletePost}>삭제</FreeDeleteDesign>
          </>
          : null
        }
      </FreepUdateDeleteDesign>
      
      <br/>
      
      <FreedIexDesign onClick={goFreeBoard}>목록으로</FreedIexDesign>

      <CommentList/>

      <br/><br/><br/>
    
    </FreeMainDesign>
    </FreeScrollDesign>
    <Messenger/>
    </BackGroundImg>
  );
};

export default PostDetail;