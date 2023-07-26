import { useState } from "react";
import { useParams } from "react-router-dom";
import { BackGroundImg } from "../BackGroundImg";
import Header from "../Header/Header";
import Messenger from "../Message/Messenger";
import {
  PostDetailDesign
} from "./PostDetail.style";


interface Post {
  id: number,
  title: string,
  content: string
}

const Tmp: Post[] = [
  {id: 1,title: "첫째 제목", content: "첫째 내용"},
  {id: 2, title: "둘째 제목", content: "둘째 내용"},
  {id: 3, title: "셋째 제목", content: "셋째 내용"},
  {id: 4, title: "넷째 제목", content: "넷째 내용"},
  {id: 5, title: "다섯째 제목", content: "다섯째 내용"},
  {id: 6, title: "여섯째 제목", content: "여섯째 내용"},
  {id: 7, title: "일곱째 제목", content: "일곱째 내용"},
  {id: 8, title: "여덟째 제목", content: "여덟째 내용"},
  {id: 9, title: "아홉째 제목", content: "아홉째 내용"},
  {id: 10, title: "열째 제목", content: "열째 내용"},
]


function PostDetail() {
  const [posts, setPosts] = useState<Post[]>(Tmp);
  const id = parseInt(useParams().id);
  const detail = posts.filter(post => post.id == id);
  console.log(detail)

  return (
    <BackGroundImg>
    <Header/>
    <PostDetailDesign>
    <br/>
    <h3>{detail[0].title}</h3>
    <hr/>
    <div>{detail[0].content}</div>
    </PostDetailDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default PostDetail;