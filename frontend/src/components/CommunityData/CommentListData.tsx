import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MyCommentsState } from "/src/recoil/Community";
import { getMyComments } from "/src/api/FreeBoard";
import ReplyIcon from "/src/assets/FreeBoard/ReplyIcon.png";
import {
  PaginationWrapper,
  PaginationItem,
} from "/src/pages/FreeBoard/FreeBoard.style";
import {
  CommentListDesign,
  TitleCommentDesign,
  TitleDesign,
  TitleDateDesign,
} from "/src/pages/CommunityData/CommunityData.style"

function CommentListData () {
  let rawday = new Date();
  rawday.setHours(rawday.getUTCHours() + 9);
  const today = rawday.toISOString();
  const id = parseInt(useParams().id || "0");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [comments, setComments] = useRecoilState(MyCommentsState);

  const navigate = useNavigate()  
  const goPostDetail = (id: number) => navigate(`/freeboard/${id}`);

  const clickPageChange = (page: number) => {
    searchComments(id, page);
  };

  const searchComments = (memberId: number, page: number) => {
    setCurrentPage(page);
    getMyComments(memberId, page).then((dataComments) => {
      if(dataComments) {
        setComments(dataComments.content)
        setTotalPages(dataComments.totalPages)
      };
    });
  };

  // useEffect
  useEffect(() => {
    searchComments(id, 1);
  }, [id]);

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
    <div style={{ marginTop: '20px'}}>
    { comments.length
    ?
    <>{comments?.map((comment) => (
      <CommentListDesign key={comment.commentId} onClick={() => goPostDetail(comment.postId || 0)}>

        <TitleCommentDesign style={{color: '#bababa'}}>
          <TitleDesign>{comment.postTitle}</TitleDesign>
          <TitleDateDesign>
            { today.slice(2, 10) === comment.postCreatedAt?.slice(2, 10)
              ? comment.postCreatedAt?.slice(11, 16)
              : comment.postCreatedAt?.slice(2, 10)
            }
          </TitleDateDesign>
        </TitleCommentDesign>

        <TitleCommentDesign>
          <TitleDesign style={{fontSize: '14px'}}>
            <img src={ReplyIcon} alt="" />
            <div>{comment.commentContent}</div>
          </TitleDesign>
          <TitleDateDesign>
            { today.slice(2, 10) === comment.commentCreatedAt?.slice(2, 10)
              ? comment.commentCreatedAt?.slice(11, 16)
              : comment.commentCreatedAt?.slice(2, 10)
            }
          </TitleDateDesign>
        </TitleCommentDesign>

      </CommentListDesign>
    ))}</>
    :  <div style={{ margin: '0 auto',  width: '1000px', height: '10vw', textAlign: 'center', lineHeight: '10vw', fontSize: '1vw',}}>해당하는 댓글이 없습니다</div>
    }

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

export default CommentListData;