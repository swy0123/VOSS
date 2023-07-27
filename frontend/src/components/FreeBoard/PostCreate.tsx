import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PostListState, PostListNum } from "../../recoil/atoms";
import { BackGroundImg } from "../BackGroundImg";
import Header from "../Header/Header";
import Messenger from "../Message/Messenger";
import {
  PostCreateBoxDesign
} from "./PostCreate.style";

function PostCreate() {
  const navigate = useNavigate()  
  const goFreeBoard = () => {navigate("/freeboard")}
  const [posts, setPosts] = useRecoilState(PostListState);
  const [num, setNum]= useRecoilState(PostListNum);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const titleChange = (event: ChangeEvent<HTMLInputElement>) =>  setTitle(event.target.value);
  const contentChange = (event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newpost = {
      id: num + 1,
      title,
      content,
    }
    setPosts([...posts, newpost])
    setNum(num+1)
    goFreeBoard()
  };

  return (
    <BackGroundImg>
    <Header/>
    <PostCreateBoxDesign>
      <h1>게시글 작성</h1><hr/>

      <form onSubmit={onSubmit}>
        <label htmlFor="posttitle">Title:</label>
        <input onChange={titleChange} value={title} type="text" id="posttitle"  placeholder="제목"/>
        <br/><br/>

        <label htmlFor="postcontent">Content:</label>
        <textarea cols={30} rows={10} onChange={contentChange} value={content} id="postcontent" placeholder="내용"/>
        <br/><br/>

        <button>작성하기</button>
      </form>
    </PostCreateBoxDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default PostCreate;