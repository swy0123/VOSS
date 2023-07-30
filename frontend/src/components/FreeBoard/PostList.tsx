import { useNavigate } from "react-router-dom";

// style
import {
  PostListDesign,
  PostNumberDesign,
  PostTitleDesign,
  PostUserDesign,
  PostCreatedatDesign
} from "./PostList.style";


function PostList({ key, id, title, nickname, userid, createAt,}: { key: number; id: number, title: string, nickname: string, userid: number, createAt: string, }) {
  const navigate = useNavigate()  
  const goPostDetail = (id: number) => navigate(`/freeboard/${id}`);
  const goProfile = (id: number) => navigate(`/profile/${id}`);

  return(
    <PostListDesign>
        <PostNumberDesign onClick={() => goPostDetail(id)}>{id}</PostNumberDesign>
        <PostTitleDesign onClick={() => goPostDetail(id)}>{title}</PostTitleDesign>
        <PostUserDesign onClick={() => goProfile(userid)}>{nickname}</PostUserDesign>
        <PostCreatedatDesign>{createAt}</PostCreatedatDesign>
    </PostListDesign>
  )
}
export default PostList;