import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { VscClose } from 'react-icons/vsc';
import { BackGroundImg } from "../../BackGroundImg";
import { getPost, updatePost, deletePost, uploadFile } from "/src/api/FreeBoard";
import { PostType, PostFilesType, PostFirstFilesType } from "/src/type/FreeBoard";
import Header from "../../Header/Header";
import Messenger from "../../Message/Messenger";
import PostHit from "/src/assets/FreeBoard/PostHit.png";
import PostComment from "/src/assets/FreeBoard/PostComment.png";
import PostLikeImg from "/src/assets/FreeBoard/PostLike.png";
import downloadImg from "/src/assets/Training/download.png";
import {
  UpdateScrollDesign,
  UpdatePostDesign,
  UpdateTitleUserDesign,
  UpdateTitleDesign,
  UpdateUserDesign,
  UpdateInfoDateDesign,
  UpdateInfoDesign,
  UpdateDateDesign,
  UpdateContentDesign,
  UpdateFilesDesign,
  UpdateFileDesign,
  UpdateUploadDesign,
  UpdateIndexDesign,
  UpdateUpdateDeleteDesign,
  UpdateUpdateDesign,
  UpdateDeleteDesign,
} from "./PostUpdate.style";


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


  const goFreeBoard = () => navigate("/freeboard");
  const UpdatePost = () => {
    const deleteFileIds = firstFiles.filter(((file: PostFirstFilesType) => !files.includes(file))).map((file: PostFirstFilesType) => file.id);
    const newFiles = files.filter((file: PostFilesType) => !('id' in file));
    console.log("deleteFileIds: ", deleteFileIds)
    console.log("newFiles: ", newFiles)
    updatePost(id, title, content, deleteFileIds, newFiles)
    .then(()=>navigate(`/freeboard/${id}`));
  }
  const DeletePost = () => (deletePost(id), navigate("/freeboard"))

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
    <UpdateScrollDesign >
    <UpdatePostDesign>
      
      {/* <h2 style={{ height: "1vh" }}></h2><br/> */}

      <UpdateTitleUserDesign>
        <UpdateTitleDesign
          placeholder="제목"
          onChange={(event: ChangeEvent<HTMLInputElement>)=>{if (event.target.value.length < 41) {setTitle(event.target.value)}}}
          value={title}>
        </UpdateTitleDesign>
        <UpdateUserDesign>
          {currentUser.nickname}
        </UpdateUserDesign>
      </UpdateTitleUserDesign>

      <UpdateInfoDateDesign>
        <UpdateInfoDesign>
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostHit} alt="PostHit" /><span style={{marginLeft: '0.5vw'}}/>{post.hits}
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostComment} alt="PostComment" /><span style={{marginLeft: '0.5vw'}}/>{commentNum} 
          <img style={{height: '2vh', marginLeft: '1vw'}} src={PostLikeImg} alt="PostLikeImg" /><span style={{marginLeft: '0.5vw'}}/>{post.likes}
        </UpdateInfoDesign>
        <UpdateDateDesign>
          {post.createdAt?.slice(0, 10)} {post.createdAt?.slice(11, 16)}
        </UpdateDateDesign>
      </UpdateInfoDateDesign>

      <UpdateContentDesign
        className="textarea"
        placeholder="내용을 입력하세요"
        onChange={changeContent}
        value={content}
        autoFocus
      />
      

      <UpdateFilesDesign>
      {files.length
        ? files.map((file: any) => (
          <UpdateFileDesign key={file.id}>
            {file.originalFileName}
            <img style={{height: '2vh', marginLeft: '1vw'}} src={downloadImg} alt="PostHit" />
            <button style={{marginLeft: '1vw'}} onClick={() => removeFile(file.id)}>
              <VscClose size='10'/>
            </button>
          </UpdateFileDesign>
          ))
        : null
      }
      </UpdateFilesDesign>

      <UpdateUpdateDeleteDesign>
      <UpdateUploadDesign>
        <label htmlFor="uploadFile">파일찾기</label>
        <input
          type='file'
          id="uploadFile"
          onChange={selectFile}
          accept='*'
          multiple={true}
          style={{ display: 'none' }}
        />
      </UpdateUploadDesign>


        <UpdateUpdateDesign onClick={UpdatePost}>수정완료</UpdateUpdateDesign>
        <UpdateDeleteDesign onClick={DeletePost}>삭제</UpdateDeleteDesign>
      </UpdateUpdateDeleteDesign>

      <br/>

      <UpdateIndexDesign onClick={goFreeBoard}>목록으로</UpdateIndexDesign>


      <br/><br/><br/>

    </UpdatePostDesign>
    </UpdateScrollDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default PostUpdate;