import { getPostList } from "/src/api/FreeBoard"
import { useEffect, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import PostList from "../../components/FreeBoard/PostList/PostList";
import { PostListType } from "/src/type/FreeBoard";
import { useRecoilState } from "recoil";
import { FreeBoardListState, FreeBoardInputState, FreeBoardSortState, FreeBoardCondState, FreeBoardCurrentPageState, FreeBoardTotalPagesState, FreeBoardTotalElementsState } from "/src/recoil/Community";
import UpdateIcon from "/src/assets/Profile/UpdateIcon.png"
import {
  FreeScrollDesign,
  FreeBoardDesign,
  OrderBoxDesign,
  OrderSelectDesign,
  PostCategoryDesign,
  PostCategoryNumberDesign,
  PostCategoryTitleDesign,
  PostCategoryUserDesign,
  PostCategoryCreatedatDesign,
  PostCategoryHitDesign,
  PostCategoryLikeDesign,
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
  const [input, setInput] = useRecoilState<string>(FreeBoardInputState);
  const [sort, setSort] = useRecoilState<string>(FreeBoardSortState);
  const [cond, setCond] = useRecoilState<string>(FreeBoardCondState);
  const [currentPage, setCurrentPage] = useRecoilState<number>(FreeBoardCurrentPageState);
  const [totalPages, setTotalPages] = useRecoilState<number>(FreeBoardTotalPagesState);
  const [totalElements, setTotalElements] = useRecoilState<number>(FreeBoardTotalElementsState);
  const [posts, setPosts] = useRecoilState<PostListType[]>(FreeBoardListState);

  const clickPageChange = (page: number) => {
    searchPost(sort, cond, input, page);
  };
  const clickSearchBtn = (event: FormEvent) => {
    event.preventDefault();
    searchPost(sort, cond, input, 1);
  };
  const enterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") { // 이걸 안하면 모든 키 입력을 못 받음
      event.preventDefault();
      searchPost(sort, cond, input, 1);
    }
  };
  
  const pageReset = () =>{
    setInput("");
    setSort("1");
    setCond("1");
    setCurrentPage(1);
    searchPost("1", "1", "", 1);
  }
  
  const searchPost = (sort: string, cond: string, input:string, page: number) => {
    setCurrentPage(page)
    // setCurrentPage 가 완료되기 전에 API 요청을 보내기 때문에 page 값을 보내야 함
    getPostList(sort, cond, input, page).then((postsData) => {
      if(postsData) {
        setPosts(postsData.content)
        setTotalPages(postsData.totalPages)
        setTotalElements(postsData.totalElements)
      };
    });
  };

  useEffect(() => {
    searchPost(sort, cond, input, 1);
  },[sort]);

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
      <FreeScrollDesign>
      <FreeBoardDesign>
        <h2 onClick={pageReset}><span style={{ cursor: 'pointer'}}>자유 게시판</span></h2>

        <OrderBoxDesign>
          <OrderSelectDesign id="sort-select" value={sort} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSort(event.target.value)}>
            <option value="1">최신순</option>
            <option value="2">조회순</option>
            <option value="3">추천순</option>
          </OrderSelectDesign>
        </OrderBoxDesign>

        <PostCategoryDesign>
          <PostCategoryNumberDesign>전체 ({(totalElements.toLocaleString())})</PostCategoryNumberDesign>
          <PostCategoryTitleDesign>제목</PostCategoryTitleDesign>
          <PostCategoryUserDesign>작성자</PostCategoryUserDesign>
          <PostCategoryCreatedatDesign>작성일</PostCategoryCreatedatDesign>
          <PostCategoryHitDesign>조회수</PostCategoryHitDesign>
          <PostCategoryLikeDesign>추천</PostCategoryLikeDesign>
        </PostCategoryDesign>
        
        { posts.length 
        ? <> 
        {posts?.map((post, index) => (
          <PostList
            key={post.id}
            page={totalElements - 10 * (currentPage - 1) - index}
            id={post.id}
            title={post.title} 
            memberId={post.memberId}
            nickname={post.nickname} 
            hasImageFile={post.hasImageFile}
            hasOtherFile={post.hasOtherFile}
            comments={post.comments}
            likes={post.likes}
            createdAt={post.createdAt}
            hits={post.hits}
          />
        ))}
        </>
        : <div style={{ height: '20vw', textAlign: 'center', lineHeight: '20vw', fontSize: '1vw',}}>해당하는 게시글이 없습니다</div>
        }

        <SearchboxDesign>
          <SearchSelectDesign id="cond-select" value={cond} onChange={(event: ChangeEvent<HTMLSelectElement>) => setCond(event.target.value)}>
            <option value="1">제목</option>
            <option value="2">제목+내용</option>
            <option value="3">작성자</option>
          </SearchSelectDesign>

          <InputBoxDesign onSubmit={clickSearchBtn}>
            <InputBoxIpt
              value={input}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
              onKeyPress={enterKeyDown} 
              type="text" 
              placeholder="검색"/>
            <InputBoxBtn>
            <img src="/src/assets/MeetingBoard/SearchInput.png" alt="" style={{width: "1vw"}}/>
            </InputBoxBtn>
          </InputBoxDesign>
          <CreateSpaceDesign/>
          <CreateBtnDesign onClick={() => goPostCreate()}>
            <img src={UpdateIcon} alt="UpdateIcon" />
            글 작성
          </CreateBtnDesign>
        </SearchboxDesign>
      </FreeBoardDesign>

      <PaginationWrapper>
      {currentPage > 1
      ? <PaginationItem onClick={() => clickPageChange(currentPage - 1)}>이전</PaginationItem>
      : <PaginationItem style={{visibility: "hidden"}}>이전</PaginationItem>
      }
      {pages.slice(startPage - 1, endPage).map((page) => (
        <PaginationItem key={page} className={page === currentPage ? "active" : ""} onClick={() => clickPageChange(page)}>
          {(page.toLocaleString())}
        </PaginationItem>
      ))}
      {currentPage < totalPages
      ? <PaginationItem onClick={() => clickPageChange(currentPage + 1)}>다음</PaginationItem>
      : <PaginationItem style={{visibility: "hidden"}}>다음</PaginationItem>
      }
      </PaginationWrapper>
      
      </FreeScrollDesign>
      <Messenger/>
    </BackGroundImg>
  )
}

export default FreeBoard;