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
import ProfileImg from "/src/assets/Header/profile_tmp.png";
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
      
      <h2 style={{ height: "1vh" }}>글 작성하기</h2><br/>

      <CreateTitleUserDesign>
        <CreateTitleDesign
          placeholder="제목을 입력해주세요 (40자 이내)"
          onChange={(event: ChangeEvent<HTMLInputElement>)=>{if (event.target.value.length < 41) {setTitle(event.target.value)}}}
          value={title}
          autoFocus
        />
        <CreateUserDesign>
          <img style={{marginRight: '1vw', height: '5vh'}} src={ProfileImg} alt="profileImg"/>
          {currentUser.nickname}
        </CreateUserDesign>
      </CreateTitleUserDesign>

      <CreateContentDesign
        className="textarea"
        onChange={(changeContent)}
        value={content}
      />

      <CreateFilesDesign>
      {files.length
        ? files.map((file: any, index: number) => (
          <CreateFileDesign key={index}>
            {file.originalFileName}
            <button onClick={() => removeFile(index)}>
              <VscClose size='10'/>
            </button>
          </CreateFileDesign>
          ))
        : null
      }
      </CreateFilesDesign>

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

      <CreateCreateRowDesign>
        <CreateCreateDesign onClick={CreatePost}>작성완료</CreateCreateDesign>
      </CreateCreateRowDesign>

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