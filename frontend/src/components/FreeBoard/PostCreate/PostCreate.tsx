import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { PostFilesType } from "/src/type/FreeBoard";
import { createPost } from "/src/api/FreeBoard";
import { VscClose } from 'react-icons/vsc';
import { BackGroundImg } from "../../BackGroundImg";
import Header from "../../Header/Header";
import Messenger from "../../Message/Messenger";
import downloadImg from "/src/assets/Training/download.png";
import { uploadFile } from "/src/api/FreeBoard";
import {
  CreateScrollDesign,
  CreatePostDesign,
  CreateTitleUserDesign,
  CreateTitleDesign,
  CreateUserDesign,
  CreateContentDesign,
  CreateFilesDesign,
  CreateFileDesign,
  CreateUploadDesign,
  CreateIndexRowDesign,
  CreateIndexDesign,
  CreateCreateRowDesign,
  CreateCreateDesign,
} from "./PostCreate.style";


function PostCreate() {
  const navigate = useNavigate()  
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const currentUser = useRecoilValue(CurrentUserAtom);
  const [files, setFiles] = useState<PostFilesType[]>([]);

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
        setFiles((prev) => [...prev, ...dataFiles]);
      };
    });
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles: any) => prevFiles.filter((_:any, i: number) => i !== index));
  };

  const goFreeBoard = () => navigate("/freeboard");
  const CreatePost = () => {
    createPost(title, content, files).then(() => goFreeBoard())
  }

  return (
    <BackGroundImg>
    <Header/>
    <CreateScrollDesign >
    <CreatePostDesign>
      
      {/* <h2 style={{ height: "1vh" }}>글 작성하기</h2><br/> */}

      <CreateTitleUserDesign>
        <CreateTitleDesign
          placeholder="제목"
          onChange={(event: ChangeEvent<HTMLInputElement>)=>{if (event.target.value.length < 41) {setTitle(event.target.value)}}}
          value={title}
        />
        <CreateUserDesign>
          {currentUser.nickname}
        </CreateUserDesign>
      </CreateTitleUserDesign>

      <CreateContentDesign
        className="textarea"
        placeholder="내용을 입력하세요"
        onChange={(changeContent)}
        value={content}
      />

      <CreateFilesDesign>
      {files.length
        ? files.map((file: any, index: number) => (
          <CreateFileDesign key={index}>
            <img style={{height: '2vh', marginLeft: '1vw'}} src={downloadImg} alt="PostHit" />
            {file.originalFileName}
            <button style={{marginLeft: '1vw'}} onClick={() => removeFile(index)}>
              <VscClose size='10'/>
            </button>
          </CreateFileDesign>
          ))
        : null
      }
      </CreateFilesDesign>

      <CreateCreateRowDesign>
       <CreateUploadDesign>
        <label htmlFor="uploadFile">파일찾기</label>
        <input
          type='file'
          id="uploadFile"
          onChange={selectFile}
          accept='*'
          multiple={true}
          style={{ display: 'none' }}
        />
        </CreateUploadDesign>

        <CreateCreateDesign onClick={CreatePost}>작성완료</CreateCreateDesign>
      </CreateCreateRowDesign>

      <br/>

      <CreateIndexRowDesign>
        <CreateIndexDesign onClick={goFreeBoard}>목록으로</CreateIndexDesign>
      </CreateIndexRowDesign>

      <br/><br/><br/>

    </CreatePostDesign>
    </CreateScrollDesign>
    <Messenger/>
  </BackGroundImg>
  );
};

export default PostCreate;