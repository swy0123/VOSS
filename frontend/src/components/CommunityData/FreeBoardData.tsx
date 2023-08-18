import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostListType } from "/src/type/FreeBoard";
import { getMyPostList } from "/src/api/FreeBoard";
import HasImageFile from "/src/assets/FreeBoard/HasImageFile.png";
import HasOtherFile from "/src/assets/FreeBoard/HasOtherFile.png";
import {
  FreeBoardDesign,
  PostCategoryDesign,
  PostCategoryNumberDesign,
  PostCategoryTitleDesign,
  PostCategoryCreatedatDesign,
  PostCategoryHitDesign,
  PostCategoryLikeDesign,
  PaginationWrapper,
  PaginationItem,
  PostListDesign,
  PostNumberDesign,
  PostTitleDesign,
  PostFileDesign,
  PostCommentsDesign,
  PostCreatedatDesign,
  PostHitDesign,
  PostLikeDesign,
} from "./FreeBoardData.style";

function FreeBoardData () {
  const id = parseInt(useParams().id || "0");
  let rawday = new Date();
  rawday.setHours(rawday.getUTCHours() + 9);
  const today = rawday.toISOString();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [posts, setPosts] = useState<PostListType[]>([]);

  const navigate = useNavigate()  
  const goPostDetail = (id: number) => navigate(`/freeboard/${id}`);

  const clickPageChange = (page: number) => {
    searchPost(id, page);
  };
  
  const searchPost = (memberId: number, page: number) => {
    setCurrentPage(page);
    getMyPostList(memberId, page).then((dataPosts) => {
      if(dataPosts) {
        setPosts(dataPosts.content)
        setTotalPages(dataPosts.totalPages)
        setTotalElements(dataPosts.totalElements)
      };
    });
  };

  // useEffect
  useEffect(() => {
    searchPost(id, 1);
  },[id]);

  // pagination
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
    <div> 
    <FreeBoardDesign>

      <PostCategoryDesign>
        <PostCategoryNumberDesign>전체 ({(totalElements.toLocaleString())})</PostCategoryNumberDesign>
        <PostCategoryTitleDesign style={{ width: '60%' }}>제목</PostCategoryTitleDesign>
        <PostCategoryCreatedatDesign>작성일</PostCategoryCreatedatDesign>
        <PostCategoryHitDesign>조회수</PostCategoryHitDesign>
        <PostCategoryLikeDesign>추천</PostCategoryLikeDesign>
      </PostCategoryDesign>


      { posts.length 
      ? <> 
      {posts?.map((post, index: number) => (
        <PostListDesign key={post.id} onClick={() => goPostDetail(post.id || 0)}>
          <PostNumberDesign>{((totalElements - 10 * (currentPage - 1) - index).toLocaleString())}</PostNumberDesign>
          <PostTitleDesign style={{ width: '54%' }}>{post.title}
          { post.hasImageFile
          ? <PostFileDesign src={HasImageFile} alt="HasImageFile"></PostFileDesign>
          : null}
          { post.hasOtherFile
          ? <PostFileDesign src={HasOtherFile} alt="HasOtherFile"></PostFileDesign>
          : null}
          { post.comments
          ? <PostCommentsDesign>{post.comments}</PostCommentsDesign>
          : null}
          </PostTitleDesign>
          <PostCreatedatDesign>
            { today.slice(2, 10) === post.createdAt?.slice(2, 10)
              ? post.createdAt?.slice(11, 16)
              : post.createdAt?.slice(2, 10)
            }
          </PostCreatedatDesign>
          <PostHitDesign>{(post.hits.toLocaleString())}</PostHitDesign>
          <PostLikeDesign>{(post.likes.toLocaleString())}</PostLikeDesign>
        </PostListDesign>
      ))}
      </>
      : <div style={{ height: '20vw', textAlign: 'center', lineHeight: '20vw', fontSize: '1vw',}}>해당하는 게시글이 없습니다</div>
      }

    </FreeBoardDesign>

    <br/>
    <PaginationWrapper>
    {currentPage > 1
    ? <PaginationItem onClick={() => clickPageChange(currentPage - 1)}>이전</PaginationItem>
    : <PaginationItem>이전</PaginationItem>
    }
    {pages.slice(startPage - 1, endPage).map((page) => (
      <PaginationItem key={page} className={page === currentPage ? "active" : ""} onClick={() => clickPageChange(page)}>
        {(page.toLocaleString())}
      </PaginationItem>
    ))}
    {currentPage < totalPages
    ? <PaginationItem onClick={() => clickPageChange(currentPage + 1)}>다음</PaginationItem>
    : <PaginationItem>다음</PaginationItem>
    }
    </PaginationWrapper>
  </div>
  )
}

export default FreeBoardData;