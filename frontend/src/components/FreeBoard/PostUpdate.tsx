import { useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PostListState, PostListNum } from "../../states/atom";
import { BackGroundImg } from "../BackGroundImg";
import Header from "../Header/Header";
import Messenger from "../Message/Messenger";
import {
    PostUpdateBoxDesign
} from "./PostUpdate.style";

function PostUpdate() {
  const navigate = useNavigate()  
  const goPostDetail = (id: number) => navigate(`/freeboard/${id}`);
  const [posts, setPosts] = useRecoilState(PostListState);
  const id = parseInt(useParams().id);
  const detail = posts.filter(post => post.id == id);
  
  const [title, setTitle] = useState<string>(detail[0].title);
  const [content, setContent] = useState<string>(detail[0].content);

  const titleChange = (event: ChangeEvent<HTMLInputElement>) =>  setTitle(event.target.value);
  const contentChange = (event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newpost = {
      id,
      title,
      content,
    }
    const newposts = posts.map((item) => {
        if (item.id === id) {
          return { id, title, content }; // 원소 내용 수정
        }
        return item; // 수정하지 않은 원소는 그대로 유지
      });
    setPosts(newposts)
    goPostDetail(id)
  };

  return (
    <BackGroundImg>
    <Header/>
    <PostUpdateBoxDesign>
      <h1>게시글 작성</h1><hr/>

      <form onSubmit={onSubmit}>
        <label htmlFor="posttitle">Title:</label>
        <input onChange={titleChange} value={title} type="text" id="posttitle"  placeholder="제목"/>
        <br/><br/>

        <label htmlFor="postcontent">Content:</label>
        <textarea onChange={contentChange} value={content} id="postcontent" placeholder="내용"/>
        <br/><br/>

        <button>작성하기</button>
      </form>
    </PostUpdateBoxDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default PostUpdate;