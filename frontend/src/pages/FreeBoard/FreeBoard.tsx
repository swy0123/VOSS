import { getPostList } from "/src/api/FreeBoard"
import { useEffect, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import PostList from "../../components/FreeBoard/PostList/PostList";
import { PostListType } from "/src/type/Auth";
import {
  FreeBoardDesign,
  OrderBoxDesign,
  OrderSelectDesign,
  PostCategoryDesign,
  PostCategoryNumberDesign,
  PostCategoryLikeDesign,
  PostCategoryTitleDesign,
  PostCategoryUserDesign,
  PostCategoryCreatedatDesign,
  PostCategoryHitDesign,
  SearchboxDesign,
  SearchSelectDesign,
  InputBoxDesign,
  InputBoxIpt,
  InputBoxBtn,
  CreateSpaceDesign,
  CreateBtnDesign,
  PaginationWrapper,
  PaginationItem
} from "./FreeBoard.style"


function FreeBoard () {
  const navigate = useNavigate();
  const goPostCreate = () => navigate('/freeboard/create');

  const [sort, setSort] = useState<string>("1");
  const [cond, setCond] = useState<string>("1");
  const [input, setInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [posts, setPosts] = useState<PostListType[]>([]);

  const clickSearchBtn = (event: FormEvent) => {
    event.preventDefault();
    searchPost();
  };
  const EnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") { // 이걸 안하면 모든 키 입력을 못 받음
      event.preventDefault();
      searchPost();
    }
  };

  const searchPost = () => {
    getPostList(sort, cond, input, currentPage-1).then((postsData) => {
      if(postsData) {
        setPosts(postsData.content)
        // setTotalPages(postsData.totalPages)
        setTotalPages(postsData.totalPages)
      }
    })
  };

  useEffect(() => {
    searchPost();
  }, [currentPage, sort]);

  const pages = [...Array(totalPages).keys()].map((page) => page + 1);
  const maxDisplayedPages = 10;
  const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);
  let startPage = Math.max(currentPage - halfDisplayedPages, 1);
  let endPage = Math.min(currentPage + halfDisplayedPages, totalPages);

  if (totalPages <= maxDisplayedPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= halfDisplayedPages) {
      startPage = 1;
      endPage = maxDisplayedPages;
    } else if (currentPage >= totalPages - halfDisplayedPages) {
      startPage = totalPages - maxDisplayedPages + 1;
      endPage = totalPages;
    }
  }

  return(
    <BackGroundImg>
      <Header/>
      <FreeBoardDesign>
        <h2 style={{ height: "1vh" }}>자유 게시판</h2>

        <OrderBoxDesign>
          <OrderSelectDesign id="sort-select" onChange={(event: ChangeEvent<HTMLSelectElement>) => setSort(event.target.value)}>
            <option value="1">최신순</option>
            <option value="2">조회순</option>
            <option value="3">좋아요순</option>
          </OrderSelectDesign>
        </OrderBoxDesign>

        <PostCategoryDesign>
          <PostCategoryNumberDesign>글 번호</PostCategoryNumberDesign>
          <PostCategoryTitleDesign>제목</PostCategoryTitleDesign>
          <PostCategoryUserDesign>작성자</PostCategoryUserDesign>
          <PostCategoryCreatedatDesign>작성일</PostCategoryCreatedatDesign>
          <PostCategoryHitDesign>조회수</PostCategoryHitDesign>
          <PostCategoryLikeDesign>좋아요</PostCategoryLikeDesign>
        </PostCategoryDesign>

        {posts.map(post => (
          <PostList
            key={post.id} 
            id={post.id}
            title={post.title} 
            nickname={post.nickname} 
            hasImageFile={post.hasImageFile}
            hasOtherFile={post.hasOtherFile}
            comments={post.comments}
            likes={post.likes}
            createdAt={post.createdAt}
            hits={post.hits}
          />
        ))}

        <SearchboxDesign style={{borderTop: "solid 1px white"}}>
          <SearchSelectDesign id="cond-select" onChange={(event: ChangeEvent<HTMLSelectElement>) => setCond(event.target.value)}>
            <option value="1">제목</option>
            <option value="2">제목+내용</option>
            <option value="3">작성자</option>
          </SearchSelectDesign>

          <InputBoxDesign onSubmit={clickSearchBtn}>
            <InputBoxIpt
              value={input}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
              onKeyPress={EnterKeyDown} 
              type="text" 
              placeholder="검색"/>
            <InputBoxBtn>
            <img src="/src/assets/MeetingBoard/SearchInput.png" alt="" style={{width: "1vw"}}/>
            </InputBoxBtn>
          </InputBoxDesign>
          <CreateSpaceDesign/>
          <CreateBtnDesign onClick={() => goPostCreate()}>작성하기</CreateBtnDesign>
        </SearchboxDesign>
      </FreeBoardDesign>

      <PaginationWrapper>
      {currentPage > 1 && (
        <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>이전</PaginationItem>
      )}
      {pages.slice(startPage - 1, endPage).map((page) => (
        <PaginationItem key={page} className={page === currentPage ? "active" : ""} onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationItem>
      ))}
      {currentPage < totalPages && (
        <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>다음</PaginationItem>
      )}
      </PaginationWrapper>

      <Messenger/>
    </BackGroundImg>
  )
}

export default FreeBoard;