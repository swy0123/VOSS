import { useNavigate } from "react-router-dom";
// style
import {
  PostListDesign,
  PostNumberDesign,
  PostLikeDesign,
  PostTitleDesign,
  PostUserDesign,
  PostCreatedatDesign,
  PostHitDesign,
} from "./PostList.style";


function PostList({ id, title, nickname, userid, createAt,}: { id: number, title: string, nickname: string, userid: number, createAt: string, }) {
  const navigate = useNavigate()  
  const goPostDetail = (id: number) => navigate(`/freeboard/${id}`);
  const goProfile = (id: number) => navigate(`/profile/${id}`);

  return(
    <PostListDesign>
        <PostNumberDesign onClick={() => goPostDetail(id)}>{id}</PostNumberDesign>
        <PostLikeDesign>
          <img src="/src/assets/LikeIt.png" alt="" />
          </PostLikeDesign>
        <PostTitleDesign onClick={() => goPostDetail(id)}>{title}</PostTitleDesign>
        <PostUserDesign onClick={() => goProfile(userid)}>{nickname}</PostUserDesign>
        <PostCreatedatDesign>{createAt}</PostCreatedatDesign>
        <PostHitDesign>hit</PostHitDesign>
    </PostListDesign>
  )
}
export default PostList;