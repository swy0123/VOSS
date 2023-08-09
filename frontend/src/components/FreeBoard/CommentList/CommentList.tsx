import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FreeBoardCommentCountState } from "/src/recoil/Community";
import { createComment, getComments, deleteComment, updateComment } from "/src/api/FreeBoard";
import { CommentType } from "/src/type/FreeBoard";
import ProfileImg from "/src/assets/Header/profile_tmp.png";
import {
  CommentListDesign,
  CommentInputDesign,
  CommentCreateDesign,
  CommentDesign,
  CommentInfoDesign,
  CommentUpdateDesign,
  CommentDeleteDesign,
  CommentContentDiv,
  CommentContentTextArea,
 } from "./CommentList.style";

function CommentList() {
  const navigate = useNavigate()
  const id = parseInt(useParams().id || "");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [content, setContent] = useState<string>("");
  const [commentCount, setCommentCount] = useRecoilState<number>(FreeBoardCommentCountState);
  const [editId, setEditId] = useState<number>(0);
  const [editContent, setEditContent] = useState<string>("");

  const contentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = 'auto';
    event.target.style.height =  event.target.scrollHeight + 'px';
    setContent(event.target.value);
  }
  const commentsGet = () => {
    getComments(id).then((dataComment) => {
      if (dataComment) {
        setContent("")
        setComments(dataComment.content)
        setCommentCount(dataComment.totalElements)
        setEditId(0)
        setEditContent("")
      }
    });
  };
  const commentCreate = () => {
    if (!content.trim()) {
      setContent("")
      return
    }
    createComment(id, content).then((res)=>{
      if (res) {commentsGet()}
    })
  };
  const commentUpdate = (commentId: number) => {
    if (!editContent.trim()) {
      setEditContent("")
      return
    }
    updateComment(id, commentId, editContent).then((res)=>{
      if (res) {commentsGet()}
    })
  };
  const commentDelete = (commentId: number) => {
    deleteComment(id, commentId).then((res)=>{
      if (res) {commentsGet()}
    })
  };

  useEffect(() => {
    commentsGet();
  }, []);

  return (
    <CommentListDesign>

      <br/><div>총 <span style={{color: '#3290A7'}}>{commentCount}</span>개의 댓글이 있습니다.</div><br/>

      <CommentInputDesign
        id="target-textarea"
        placeholder="댓글을 입력하세요"
        onChange={contentChange}
        value={content}
      />

      <CommentCreateDesign onClick={commentCreate}>등록</CommentCreateDesign><br/><br/>
      
      {comments?.map(comment => (
        <CommentDesign key={comment.id}>

          <CommentInfoDesign>
          <img style={{marginRight: '1vw', height: '60%'}} src={ProfileImg} alt="profileImg"/>
          {`${comment.nickname} | `} 
          {comment.createdAt?.slice(0, 10)} {comment.createdAt?.slice(11, 19)}

          { comment.id === editId
            ? <>
              <CommentUpdateDesign onClick={()=>commentUpdate(comment.id || 0)}>완료</CommentUpdateDesign>
              <CommentDeleteDesign onClick={()=>(setEditId(0), setEditContent(""))}>취소</CommentDeleteDesign>
              </>
            : <>
              <CommentUpdateDesign onClick={()=>((setEditId(comment.id || 0)), setEditContent(comment.content || ""))}>수정</CommentUpdateDesign>
              <CommentDeleteDesign onClick={()=>commentDelete(comment.id || 0)}>삭제</CommentDeleteDesign>
              </>
          }
          </CommentInfoDesign>

          { comment.id === editId
            ? <CommentContentTextArea 
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setEditContent(event.target.value)}
                value={editContent}
                autoFocus
              />
            : <CommentContentDiv>
              {comment.content}
              </CommentContentDiv>
          }

        </CommentDesign>
      ))}

    </CommentListDesign>
  );
};

export default CommentList;