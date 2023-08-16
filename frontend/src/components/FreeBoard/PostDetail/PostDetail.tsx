import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FreeBoardCommentCountState } from "/src/recoil/Community";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import { getPost, deletePost, postLike, deleteLike } from "/src/api/FreeBoard";
import { PostType, PostFilesType } from "/src/type/FreeBoard";
import ConfirmContext from "/src/context/confirm/ConfirmContext";
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
  FreeLikeNumDesign,
  FreeLikeImageDesign,
  FreeFilesDesign,
  FreeFileDesign,
  FreepUdateDeleteDesign,
  FreeUpdateDesign,
  FreeDeleteDesign,
  FreedIexDesign,
} from "../FreeBoardDetail.style";

const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com";

function PostDetail() {
  const navigate = useNavigate();
  const id = parseInt(useParams().id || "");
  const me = useRecoilValue(CurrentUserAtom).userid;
  const [post, setPost] = useState<PostType>({});
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<PostFilesType[]>([]);
  const [otherFiles, setOtherFiles] = useState<PostFilesType[]>([]);
  const commentCount = useRecoilValue<number>(FreeBoardCommentCountState);
  const { confirm: confirmComp } = useContext(ConfirmContext);

  const onConfirmClick = async (text:string)  => {
    const result = await confirmComp(text);
      console.log("custom", result);
    return result;
  };

  const goFreeBoard = () => navigate("/freeboard");
  const goUpdate = () => (navigate(`/freeboard/update/${id}`));
  const goProfile = () => (navigate(`/profile/${post.memberId}`));

  const DeletePost = async () => {
    const ret = await onConfirmClick("게시글을 삭제하시겠습니까");
    if(ret){
      deletePost(id).then((res) => {
        if (res) navigate("/freeboard")
      })
    };
  };

  const LikePost = () => {
    if (liked) {
      deleteLike(id).then((dataLikes) =>{
        if (dataLikes) {
          setLikes(likes-1)
          setLiked(!liked)
        };
      });
    } else {
      postLike(id).then((dataLikes) => {
        if (dataLikes) {
          setLikes(likes+1)
          setLiked(!liked)
        };
      });
    }
  };

  const downloadFile = (file: PostFilesType) => {
    fetch(`${FILE_SERVER_URL}/${file.savedFileName}`, {method: 'GET', mode: 'no-cors'})
    .then(res => {
      return res.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.originalFileName}`;
      document.body.appendChild(a); 
      a.click();  
      setTimeout(
        (_: any) => { window.URL.revokeObjectURL(url); }, 
        60000); 
      a.remove(); 
    })
    .catch(err => {
      console.error('err: ', err);
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
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostHitImg} alt="PostHit" /><span style={{marginLeft: '0.5vw'}}/>{(post.hits?.toLocaleString())}
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostComment} alt="PostComment" /><span style={{marginLeft: '0.5vw'}}/>{(commentCount.toLocaleString())} 
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostLikeImg} alt="PostLikeimg" /><span style={{marginLeft: '0.5vw'}}/>{(likes.toLocaleString())}
        </FreeInfoDesign>
        <FreeDateDesign>
          {post.createdAt?.slice(0, 10)} {post.createdAt?.slice(11, 16)}
        </FreeDateDesign>
      </FreeInfoDateDesign>

      <FreeContentDesign>
        {post.content?.split("\n").map((line) => {
          return (<span>{line}<br /></span>);
        })}
        {imageFiles.map((file, index: number) => (
          <div key={index}>
            <br/><br/>
            <img src={`${FILE_SERVER_URL}/${file.savedFileName}`} alt="" />
          </div>
        ))}
      </FreeContentDesign>
      
      <FreeLikeImageDesign onClick={LikePost}>{ liked ? <img src={LikeItImg} alt="LikeIT"/> : <img src={PostLikeImg} alt="PostLikeimg"/>}</FreeLikeImageDesign>
      <FreeLikeNumDesign>{likes.toLocaleString()}</FreeLikeNumDesign>

      <FreepUdateDeleteDesign>
          { imageFiles.length || otherFiles.length
          ? <FreeFilesDesign>
            첨부파일 : 
            {imageFiles.map((file, index: number) => (
              <FreeFileDesign key={index} onClick={()=>downloadFile(file)}>
                {file.originalFileName}
                <img style={{height: '2vh', marginLeft: '1vw'}} src={downloadImg} alt="Download" />
              </FreeFileDesign>
            ))}
            {otherFiles.map((file, index: number) => (
              <FreeFileDesign key={index} onClick={()=>downloadFile(file)}>
                {file.originalFileName}
                <img style={{height: '2vh', marginLeft: '1vw'}} src={downloadImg} alt="Download" />
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
