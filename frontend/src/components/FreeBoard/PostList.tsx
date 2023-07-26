import { useNavigate } from "react-router-dom";
import {
  PostListDesign,
  PostNumberDesign,
  PostTitleDesign,
  PostUserDesign,
  PostCreatedatDesign
} from "./PostList.style";


function PostList({ key, id, title}: { key: number; id: number, title: string; }) {
  const navigate = useNavigate()  
  const goPostDetail = (id: number) => navigate(`/freeboard/${id}`);
  
  return(
    <PostListDesign>
        <PostNumberDesign onClick={() => goPostDetail(id)}>{id}</PostNumberDesign>
        <PostTitleDesign onClick={() => goPostDetail(id)}>{title}</PostTitleDesign>
        <PostUserDesign>user</PostUserDesign>
        <PostCreatedatDesign>created_at</PostCreatedatDesign>
    </PostListDesign>
  )
}
export default PostList;