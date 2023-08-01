import { getPostList } from "/src/api/FreeBoard"
import { useEffect, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import PostList from "../../components/FreeBoard/PostList";
import { useRecoilState } from "recoil";
import { PostListState } from "../../recoil/Community";
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
  const [posts, setPosts] = useRecoilState(PostListState);
  const [curPosts, setCurPosts] = useState(posts);
  const [showPosts, setShowPosts] = useState(curPosts);
  const [searchCond, setSearchCond] = useState<string>("title");
  const [inputs, setInputs] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(posts.length / 10));

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => setInputs(event.target.value);

  const handlePageChange = (page: number) => {setCurrentPage(page);};
  
  const clickSearchBtn = (event: FormEvent) => {
    event.preventDefault();
    searchPostAndUpdate();
  };
  
  const EnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") { // 이걸 안하면 모든 키 입력을 못 받음
      event.preventDefault();
      searchPostAndUpdate();
    }
  };
  
  const searchPostAndUpdate = () => {
    const trimmedInputs = inputs.trim();
    if (trimmedInputs.length > 0) {
      if (searchCond === "title") {
        setCurPosts(posts.filter((post) => post.title.includes(trimmedInputs)));
      } else if (searchCond === "content") {
        setCurPosts(posts.filter((post) => post.title.includes(trimmedInputs) || post.content.includes(trimmedInputs)));
      } else {
        setCurPosts(posts.filter((post) => post.nickname.includes(trimmedInputs)));
      }
    } else setCurPosts(posts);
    setCurrentPage(1)
  };

  useEffect(() => {
    setTotalPages(Math.ceil(curPosts.length / 10)); // Update totalPages after filtering
    setShowPosts(curPosts.slice((currentPage-1) * 10, currentPage*10))
  }, [currentPage, curPosts]);

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
          <OrderSelectDesign id="order-select">
            <option value="1">최신순</option>
            <option value="2">조회순</option>
            <option value="3">좋아요순</option>
          </OrderSelectDesign>
        </OrderBoxDesign>

        <PostCategoryDesign>
          <PostCategoryNumberDesign>글 번호</PostCategoryNumberDesign>
          <PostCategoryLikeDesign></PostCategoryLikeDesign>
          <PostCategoryTitleDesign>제목</PostCategoryTitleDesign>
          <PostCategoryUserDesign>작성자</PostCategoryUserDesign>
          <PostCategoryCreatedatDesign>작성일</PostCategoryCreatedatDesign>
          <PostCategoryHitDesign>조회수</PostCategoryHitDesign>
        </PostCategoryDesign>

        {showPosts.map(post => (
          <PostList key={post.id} id={post.id} title={post.title} nickname={post.nickname} userid={post.userid} createAt={post.createAt}/>
          ))}

        <SearchboxDesign style={{borderTop: "solid 1px white"}}>
          <SearchSelectDesign id="search-select" onChange={(e)=>setSearchCond(e.target.value)}>
            <option value="title">제목</option>
            <option value="content">제목+내용</option>
            <option value="user">작성자</option>
          </SearchSelectDesign>

          <InputBoxDesign onSubmit={clickSearchBtn}>
            <InputBoxIpt value={inputs} onChange={inputChange} onKeyPress={EnterKeyDown} type="text" placeholder="검색" />
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
        <PaginationItem onClick={() => handlePageChange(currentPage - 1)}>이전</PaginationItem>
      )}

      {pages.slice(startPage - 1, endPage).map((page) => (
        <PaginationItem key={page} className={page === currentPage ? "active" : ""} onClick={() => handlePageChange(page)}>
          {page}
        </PaginationItem>
      ))}

      {currentPage < totalPages && (
        <PaginationItem onClick={() => handlePageChange(currentPage + 1)}>다음</PaginationItem>
      )}
      </PaginationWrapper>
      <Messenger/>
    </BackGroundImg>
  )
}

export default FreeBoard;