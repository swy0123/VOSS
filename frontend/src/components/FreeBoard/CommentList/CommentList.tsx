import { useState, useEffect, ChangeEvent, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { FreeBoardCommentCountState } from "/src/recoil/Community";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { createComment, getComments, deleteComment, updateComment } from "/src/api/FreeBoard";
import { CommentType } from "/src/type/FreeBoard";
import ConfirmContext from "/src/context/confirm/ConfirmContext";
import ProfileNull from "/src/assets/Profile/ProfileNull.png";
import {
  CommentListDesign,
  CommentInputDesign,
  CommentCreateDesign,
  CommentDesign,
  CommentInfoDesign,
  CommentUpdateDesign,
  CommentDeleteDesign,
  CommentContentDiv,
  EditCommentBox,
  CommentContentTextArea,
  EditBtn ,
 } from "./CommentList.style";

 const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com";

function CommentList() {
  const navigate = useNavigate()
  const id = parseInt(useParams().id || "");
  const me = useRecoilValue(CurrentUserAtom).userid;
  const [comments, setComments] = useState<CommentType[]>([]);
  const [content, setContent] = useState<string>("");
  const [commentCount, setCommentCount] = useRecoilState<number>(FreeBoardCommentCountState);
  const [editId, setEditId] = useState<number>(0);
  const [editContent, setEditContent] = useState<string>("");
  const goProfile = (memberId: number) => (navigate(`/profile/${memberId}`));
  const { confirm: confirmComp } = useContext(ConfirmContext);

  const onConfirmClick = async (text:string)  => {
    const result = await confirmComp(text);
      console.log("custom", result);
    return result;
  };

  const contentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 500) {
      alert('500자를 초과합니다')
      return;
    }
    event.target.style.height = 'auto';
    event.target.style.height =  event.target.scrollHeight + 'px';
    setContent(event.target.value);
  };

  const EditContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 500) {
      alert('500자를 초과합니다')
      return;
    }
    setEditContent(event.target.value);
  };

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
      alert('댓글 내용이 비어있습니다')
      return;
    }
    createComment(id, content).then((res)=>{
      if (res) {commentsGet(); window.scrollTo(0, document.body.scrollHeight)}
    })
  };

  const commentUpdate = (commentId: number) => {
    if (!editContent.trim()) {
      alert('댓글 내용이 비어있습니다')
      return;
    }
    updateComment(id, commentId, editContent).then((res)=>{
      if (res) {commentsGet()}
    })
  };

  const commentDelete = async (commentId: number) => {
    const ret = await onConfirmClick("댓글을 삭제하시겠습니까?");
    if(ret){
      deleteComment(id, commentId).then((res)=>{
        if (res) {commentsGet()}
      })
    };
  };

  useEffect(() => {
    commentsGet();
  }, [id]);

  return (
    <CommentListDesign>

      <br/><br/>
      <div>총 <span style={{color: '#3290A7'}}>{commentCount}</span>개의 댓글이 있습니다.</div><br/>

      <CommentInputDesign
        id="target-textarea"
        placeholder="댓글을 입력하세요 (500자 이내)"
        onChange={contentChange}
        value={content}
      />

      <CommentCreateDesign onClick={commentCreate}>등록</CommentCreateDesign><br/><br/>
      
      {comments?.map(comment => (
        <CommentDesign key={comment.id}>

          <CommentInfoDesign>
          <img 
            onClick={()=>goProfile(comment.memberId || me)}
            src={ comment.profileImage ? `${FILE_SERVER_URL}/${comment.profileImage}` : ProfileNull } alt="profileImg"/>
          <span onClick={()=>goProfile(comment.memberId || me)}>{comment.nickname}</span>
          {"\u00A0"}{"\u00A0"}|{"\u00A0"}{"\u00A0"}
          {comment.createdAt?.slice(2, 10)} {comment.createdAt?.slice(11, 19)}

          { comment.memberId === me
          ? <>
            { comment.id === editId
              ? <>
                <CommentDeleteDesign style={{marginLeft: 'auto'}} onClick={()=>(setEditId(0), setEditContent(""))}>취소</CommentDeleteDesign>
                </>
              : <>
                <CommentUpdateDesign onClick={()=>((setEditId(comment.id || 0)), setEditContent(comment.content || ""))}>수정</CommentUpdateDesign>
                <CommentDeleteDesign onClick={()=>commentDelete(comment.id || 0)}>삭제</CommentDeleteDesign>
                </>
            }
            </>
          : null}

          </CommentInfoDesign>

          { comment.id === editId
            ? <EditCommentBox>
              <CommentContentTextArea 
                onChange={EditContentChange}
                value={editContent}
                autoFocus
              />
              <EditBtn onClick={()=>commentUpdate(comment.id || 0)}>
                댓글수정
              </EditBtn>
              </EditCommentBox>
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