import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { VscClose } from 'react-icons/vsc';
import { BackGroundImg } from "../../BackGroundImg";
import { getPost, updatePost, deletePost, uploadFile } from "/src/api/FreeBoard";
import { PostType, PostFilesType } from "/src/type/FreeBoard";
import Header from "../../Header/Header";
import Messenger from "../../Message/Messenger";
import PostHit from "/src/assets/FreeBoard/PostHit.png";
import PostComment from "/src/assets/FreeBoard/PostComment.png";
import PostLikeImg from "/src/assets/FreeBoard/PostLike.png";
import downloadImg from "/src/assets/Training/download.png";
import {
  FreeScrollDesign,
  FreeMainDesign,
  FreeTitleUserDesign,
  FreeTitleInputDesign,
  FreeUserDesign,
  FreeInfoDateDesign,
  FreeInfoDesign,
  FreeDateDesign,
  FreeContentTextAreaDesign,
  FreeFilesDesign,
  FreeFileDesign,
  FreepUdateDeleteDesign,
  FreeUploadDesign,
  FreeUpdateDesign,
  FreeDeleteDesign,
  FreedIexDesign
} from "../FreeBoardDetail.style"


function PostUpdate() {
  const navigate = useNavigate();
  const id = parseInt(useParams().id || "");
  const [post, setPost] = useState<PostType>({});
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [commentNum, setCommentNum] = useState<number>(0);
  const currentUser = useRecoilValue(CurrentUserAtom);
  const [files, setFiles] = useState<any>([]);
  const [firstFiles, setFirstFiles] = useState<any>([]);

  const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 1000) {
      alert('1000자를 초과하였습니다')
      return;
    }
    event.target.style.height = 'auto';
    event.target.style.height =  event.target.scrollHeight + 'px';
    setContent(event.target.value);
  };  
  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    uploadFile(newFiles).then((dataFiles) => {
      if (dataFiles) {
        setFiles((prev: any) => [...prev, ...dataFiles]);
      };
    });
    e.target.value = '';
  };
  const removeFile = (id: number) => {
    setFiles((prevFiles: any) => prevFiles.filter((file: any) => file.id !== id));
  };
  
  const goProfile = () => (navigate(`/profile/${post.memberId}`));
  const goFreeBoard = () => navigate("/freeboard");

  const UpdatePost = () => {
    if (!title.trim()) {
      alert('제목이 비어있습니다')
      return;
    }
    if (!content.trim()) {
      alert('내용이 비어있습니다')
      return;
    }
    const deleteFileIds = firstFiles.filter(((file: PostFilesType) => !files.includes(file))).map((file: PostFilesType) => file.id);
    const newFiles = files.filter((file: PostFilesType) => !('id' in file));
    console.log("deleteFileIds: ", deleteFileIds)
    console.log("newFiles: ", newFiles)
    updatePost(id, title, content, deleteFileIds, newFiles)
    .then(()=>navigate(`/freeboard/${id}`));
  }

  useEffect(() => {
    getPost(id).then((dataPost) => {
      if (dataPost) {
        setPost(dataPost);
        setTitle(dataPost.title)
        setContent(dataPost.content)
        setCommentNum(dataPost.comments.size);
        setFiles([...dataPost.imageFiles,  ...dataPost.otherFiles])
        setFirstFiles([...dataPost.imageFiles, ...dataPost.otherFiles])
      }
    })
  }, [id])


  return (
    <BackGroundImg>
    <Header/>
    <FreeScrollDesign >
    <FreeMainDesign>
      
      {/* <h2 style={{ height: "1vh" }}></h2><br/> */}

      <FreeTitleUserDesign>
        <FreeTitleInputDesign
          placeholder="제목 (40자 이내)"
          onChange={(event: ChangeEvent<HTMLInputElement>)=>{if (event.target.value.length < 41) {setTitle(event.target.value)}}}
          value={title}>
        </FreeTitleInputDesign>
        <FreeUserDesign>
          <span onClick={goProfile}>{currentUser.nickname}</span>
        </FreeUserDesign>
      </FreeTitleUserDesign>

      <FreeInfoDateDesign>
        <FreeInfoDesign>
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostHit} alt="PostHit" /><span style={{marginLeft: '0.5vw'}}/>{(post.hits?.toLocaleString())}
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostComment} alt="PostComment" /><span style={{marginLeft: '0.5vw'}}/>{(commentNum.toLocaleString())} 
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostLikeImg} alt="PostLikeImg" /><span style={{marginLeft: '0.5vw'}}/>{(post.likes?.toLocaleString())}
        </FreeInfoDesign>
        <FreeDateDesign>
          {post.createdAt?.slice(0, 10)} {post.createdAt?.slice(11, 16)}
        </FreeDateDesign>
      </FreeInfoDateDesign>

      <FreeContentTextAreaDesign
        className="textarea"
        placeholder="내용을 입력하세요 (1000자 이내)"
        onChange={changeContent}
        value={content}
        autoFocus
      />
      
      <br/><br/><br/><br/>

      <FreeFilesDesign>
      첨부파일({files.length})
      {files.length
        ? files.map((file: any) => (
          <FreeFileDesign key={file.id}>
            {file.originalFileName}
            <img style={{height: '2vh', marginLeft: '1vw'}} src={downloadImg} alt="PostHit" />
            <button style={{marginLeft: '1vw'}} onClick={() => removeFile(file.id)}>
              <VscClose size='10'/>
            </button>
          </FreeFileDesign>
          ))
        : null
      }
      </FreeFilesDesign>

      <FreepUdateDeleteDesign>
      <FreeUploadDesign>
        <label style={{cursor: 'pointer'}} htmlFor="uploadFile">파일찾기</label>
        <input
          type='file'
          id="uploadFile"
          onChange={selectFile}
          accept='*'
          multiple={true}
          style={{ display: 'none' }}
        />
      </FreeUploadDesign>


        <FreeUpdateDesign onClick={UpdatePost}>수정완료</FreeUpdateDesign>
        <FreeDeleteDesign onClick={()=>navigate(-1)}>취소</FreeDeleteDesign>
      </FreepUdateDeleteDesign>

      <br/>

      <FreedIexDesign onClick={goFreeBoard}>목록으로</FreedIexDesign>


      <br/><br/><br/>

    </FreeMainDesign>
    </FreeScrollDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default PostUpdate;