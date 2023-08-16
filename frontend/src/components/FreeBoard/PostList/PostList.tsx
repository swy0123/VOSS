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


function PostList({ id, title, nickname, memberId, hasImageFile, hasOtherFile, comments, likes, createdAt, hits, page}: PostListType ) {
  let rawday = new Date();
  rawday.setHours(rawday.getUTCHours() + 9);
  const today = rawday.toISOString();
  const navigate = useNavigate()  
  const goPostDetail = (id: number) => navigate(`/freeboard/${id}`);
  const goProfile = (id: number) => navigate(`/profile/${id}`);

  return(
    <PostListDesign>
        <PostNumberDesign onClick={() => goPostDetail(id || 0)}>{(page.toLocaleString())}</PostNumberDesign>
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
        <PostUserDesign><span onClick={() => goProfile(memberId ||0)}>{nickname}</span></PostUserDesign>
        <PostCreatedatDesign>
          { today.slice(2, 10) === createdAt?.slice(2, 10)
            ? createdAt?.slice(11, 16)
            : createdAt?.slice(2, 10)
          }
        </PostCreatedatDesign>
        <PostHitDesign>{(hits.toLocaleString())}</PostHitDesign>
        <PostLikeDesign>{(likes.toLocaleString())}</PostLikeDesign>
    </PostListDesign>
  );
};

export default PostList;