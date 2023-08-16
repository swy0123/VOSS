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
  FreedIexDesign
} from "../FreeBoardDetail.style";


function PostCreate() {
  const navigate = useNavigate()  
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const currentUser = useRecoilValue(CurrentUserAtom);
  const [files, setFiles] = useState<PostFilesType[]>([]);
  
  const goProfile = () => (navigate(`/profile/${currentUser.userid}`));

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
    if (!title.trim()) {
      alert('제목이 비어있습니다')
      return;
    }
    if (!content.trim()) {
      alert('내용이 비어있습니다')
      return;
    }
    createPost(title, content, files).then(() => goFreeBoard())
  }

  return (
    <BackGroundImg>
    <Header/>
    <FreeScrollDesign >
    <FreeMainDesign>

      <FreeTitleUserDesign>
        <FreeTitleInputDesign
          placeholder="제목 (40자 이내)"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {if (event.target.value.length < 41) {setTitle(event.target.value)}}}
          value={title}
          // autoFocus
        />
        <FreeUserDesign>
          <span onClick={goProfile}>{currentUser.nickname}</span>
        </FreeUserDesign>
      </FreeTitleUserDesign>

      <FreeInfoDateDesign>
        <FreeInfoDesign/>
        <FreeDateDesign/>
      </FreeInfoDateDesign>

      <FreeContentTextAreaDesign
        className="textarea"
        placeholder="내용을 입력하세요 (1000자 이내)"
        onChange={(changeContent)}
        value={content}
      />

      <br/><br/><br/><br/>

      <FreeFilesDesign>
      첨부파일({files.length})
      {files.length
        ? files.map((file: any, index: number) => (
          <FreeFileDesign key={index}>
            {file.originalFileName}
            <img style={{height: '2vh', marginLeft: '1vw'}} src={downloadImg} alt="downloadimg" />
            <button style={{marginLeft: '1vw'}} onClick={() => removeFile(index)}>
              <VscClose size='10'/>
            </button>
          </FreeFileDesign>
          ))
        : null
      }
      </FreeFilesDesign>

      <FreepUdateDeleteDesign>
       <FreeUploadDesign>
        <label htmlFor="uploadFile">파일찾기</label>
        <input
          type='file'
          id="uploadFile"
          onChange={selectFile}
          accept='*'
          multiple={true}
          style={{ display: 'none' }}
        />
        </FreeUploadDesign>

        <FreeUpdateDesign onClick={CreatePost}>작성완료</FreeUpdateDesign>
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

export default PostCreate;