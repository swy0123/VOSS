import { useNavigate } from "react-router-dom";
import { PostListType } from "/src/type/FreeBoard";
import HasImageFile from "/src/assets/FreeBoard/HasImageFile.png"
import HasOtherFile from "/src/assets/FreeBoard/HasOtherFile.png"
import {
  PostListDesign,
  PostNumberDesign,
  PostTitleDesign,
  PostFileDesign,
  PostCommentsDesign,
  PostUserDesign,
  PostCreatedatDesign,
  PostHitDesign,
  PostLikeDesign,
} from "./PostList.style";


function PostList({ id, title, nickname, memberId, hasImageFile, hasOtherFile, comments, likes, createdAt, hits}: PostListType) {
  const navigate = useNavigate()  
  const goPostDetail = (id: number) => navigate(`/freeboard/${id}`);
  const goProfile = (id: number) => navigate(`/profile/${id}`);

  return(
    <PostListDesign>
        <PostNumberDesign onClick={() => goPostDetail(id || 0)}>{id}</PostNumberDesign>
        <PostTitleDesign onClick={() => goPostDetail(id || 0)}>{title}
        { hasImageFile
        ? <PostFileDesign src={HasImageFile} alt="HasImageFile"></PostFileDesign>
        : null}
        { hasOtherFile
        ? <PostFileDesign src={HasOtherFile} alt="HasOtherFile"></PostFileDesign>
        : null}
        { comments
        ? <PostCommentsDesign>{comments}</PostCommentsDesign>
        : null}
        </PostTitleDesign>
        <PostUserDesign onClick={() => goProfile(memberId ||0)}>{nickname}</PostUserDesign>
        <PostCreatedatDesign>{`${createdAt?.slice(0, 10)} ${createdAt?.slice(11, 16)}`}</PostCreatedatDesign>
        <PostHitDesign>{hits}</PostHitDesign>
        <PostLikeDesign>{likes}</PostLikeDesign>
    </PostListDesign>
  );
};

export default PostList;