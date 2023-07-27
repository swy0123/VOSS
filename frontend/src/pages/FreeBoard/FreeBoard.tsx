import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackGroundImg } from "../../components/BackGroundImg";
import Header from "../../components/Header/Header";
import Messenger from "../../components/Message/Messenger";
import PostList from "../../components/FreeBoard/PostList";
// recoil
import { useRecoilState } from "recoil";
import { PostListState, PostSearchState } from "../../recoil/atoms";
// style
import {
  FreeBoardDesign,
  DropdownDesign,
  OrderSelectDesign,
  PostListDesign,
  PostNumberDesign,
  PostTitleDesign,
  PostUserDesign,
  PostCreatedatDesign,
  SearchboxDesign,
  SearchSelectDesign,
  InputBoxDesign,
  InputBoxIpt,
  InputBoxBtn,
  CreateSpaceDesign,
  CreateBtnDesign,
} from "./FreeBoard.style"




function FreeBoard () {
  const navigate = useNavigate();
  const goPostCreate = () => navigate('/freeboard/create');
  const [searchCond, setSearchCond] = useState("4");
  const [posts, setPosts] = useRecoilState(PostListState);
  const [curPosts, setCurPosts] = useRecoilState(PostSearchState);
  const [inputs, setInputs] = useState<string>("");
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => setInputs(event.target.value)

  const searchPost = () => {
    const trimmedInputs = inputs.trim();
    trimmedInputs.length > 0
    ? setCurPosts(posts.filter(post => post.title.includes(trimmedInputs)))
    : setCurPosts(posts)
  };

  const EnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchPost();
    }
  };
  
  return(
    <BackGroundImg>
      <Header/>
      <FreeBoardDesign>
        <h3>자유 게시판</h3>

        <DropdownDesign>
          <OrderSelectDesign id="order-select">
            <option value="1">최신순</option>
            <option value="2">조회순</option>
            <option value="3">좋아요순</option>
          </OrderSelectDesign>
        </DropdownDesign>

        <PostListDesign>
          <PostNumberDesign>글 번호</PostNumberDesign>
          <PostTitleDesign>제목</PostTitleDesign>
          <PostUserDesign>작성자</PostUserDesign>
          <PostCreatedatDesign>작성일</PostCreatedatDesign>
        </PostListDesign>

        {curPosts.map(post => (
        <PostListDesign>
          <PostList key={post.id} id={post.id} title={post.title} nickname={post.nickname} userid={post.userid}/>
        </PostListDesign>
        ))}

        <SearchboxDesign>
          <SearchSelectDesign id="search-select" onChange={()=>setSearchCond(value)}>
            <option value="title">제목</option>
            <option value="content">제목+내용</option>
            <option value="user">작성자</option>
          </SearchSelectDesign>

          <InputBoxDesign>
          <InputBoxIpt onChange={inputChange} onKeyPress={EnterKeyDown} type="text" placeholder="검색" />
          <InputBoxBtn
          ><img 
          src="/src/assets/MeetingBoard/SearchInput.png" alt="" style={{width: "1vw"}}
          onClick={() => searchPost()}
          />
          </InputBoxBtn>
          </InputBoxDesign>
          <CreateSpaceDesign/>
          <CreateBtnDesign onClick={() => goPostCreate()}>작성하기</CreateBtnDesign>
        </SearchboxDesign>

      </FreeBoardDesign>
      <Messenger/>
    </BackGroundImg>
  )
}

export default FreeBoard;