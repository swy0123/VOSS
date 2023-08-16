  import styled from "styled-components"
import { useState, ChangeEvent } from "react";
import { VscClose } from 'react-icons/vsc';
import { uploadRecord, createRecord } from "/src/api/recordBoard";
import { useRecoilState } from "recoil";
import { ShowRecordCreateModalState } from "/src/recoil/Community";
import { PostFilesType } from "/src/type/FreeBoard";


const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.5);
  `;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  padding: 20px 50px;
  width: 200px;
  height: 350px;
  border-radius: 10px;
  background-color: white;
  z-index: 100;
`;

const RecordItemDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px;
  margin-top: 0px;
  width: 230px;
  height: 290px;
  color: #313131;
  /* border: solid 1px green; */
`;

const RecordTitleDesign = styled.textarea`
  padding: 15px 25px 25px 25px;
  width: 180px;
  height: 100px;
  font-size: 14px;
  line-height: 20px;
  overflow-wrap: break-word;
  border-radius: 8px;
  border: solid 2px #313131;
  font-family: "Pretendard-Regular, sans-serif";
  &::placeholder {
    font-size: 12px;
  }
`;

const RecordSpaceDesign = styled.div`
  width: 230px;
  height: 20px;
  /* border: 1px solid red; */
`

const RecordFileDesign = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 5px;
  width: 220px;
  height: 30px;
  font-size: 11px;
  /* border: 1px solid red; */
  div {
    text-align: center;
    line-height: 25px;
    overflow: hidden;
    white-space: nowrap;
    width: 160px;
    height: 25px;
    text-decoration: underline;
    /* border: 1px solid red; */
  }
`;

const RecordUploadDesign = styled.div`
  height: 30px;
  background-color: #313131;
  border-radius: 5px;
  cursor: pointer;
  /* border: solid 1px #313131; */
  label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 30px;
    img {
    height: 60%;
    }   
}
`;

const ModalBtns = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
  height: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  line-height: 28px;
  /* border: solid 2px green; */
  `;

const ModalNoBtn = styled.div`
  width: 45px;
  height: 28px;
  border-radius: 5px;
  border: solid 2px #313131;
  color: #313131;
  cursor: pointer;
  `;
  
const ModalYesBtn = styled.div`
  width: 45px;
  height: 28px;
  border-radius: 5px;
  border: solid 2px #313131;
  background-color: #313131;
  color: white;
  cursor: pointer;
`;


function RecordCreateModal() {
  const [showCreateModal, setShowCreateModal] = useRecoilState(ShowRecordCreateModalState);
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<PostFilesType[]>([]);

  const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > 50) {
      alert('50자를 초과하였습니다')
      return;
    }
    setDescription(event.target.value)
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFile = Array.from(e.target.files);
    uploadRecord(newFile).then((dataFile) => {
      if (dataFile) {
        setFiles([dataFile[0]]);
      };
    });
    e.target.value = '';
  };

  const recordCreate = () => {
    if (files.length < 1) {
      alert('파일이 없습니다')
      return;
    }
    if (description.trim().length < 1) {
      alert('내용이 없습니다')
      return;
    } 
    createRecord(description, files[0]).then((data) => {
      if (data) {
        window.location.reload();
      }
    });
  };

  return (
    <BackDrop>
    <ModalContainer>

      <RecordItemDesign>
        <RecordTitleDesign
          className="textarea"
          placeholder="내용을 입력하세요 (50자 이내)"
          onChange={changeContent}
          value={description}
        >
        </RecordTitleDesign> 

        <RecordSpaceDesign/>

        { files.length
        ? files.map((file) => (
          <RecordFileDesign>
              <div>{file.originalFileName}</div>
              <button style={{ cursor: 'pointer'}} onClick={() => setFiles([])}>
                <VscClose size='10'/>
              </button>
          </RecordFileDesign>
        ))
        : <RecordFileDesign style={{textAlign: 'center', lineHeight: '15px', fontSize: '10px'}}>
          1개의 파일만 가능합니다<br/>(mp3, m4a, wav, ogg)
        </RecordFileDesign>
        }

        <RecordUploadDesign>
          <label htmlFor="uploadRecord">
          <img src="/src/assets/Modal/UploadIconLight.png" alt="UploadIconLight" />
          </label>
          <input
            type='file'
            id="uploadRecord"
            onChange={selectFile}
            accept='.mp3, .m4a, .wav, .ogg'
            multiple={false}
            style={{ display: 'none' }}
          />
        </RecordUploadDesign>
      </RecordItemDesign>

      <ModalBtns>
        <ModalNoBtn onClick={()=>{setShowCreateModal(false)}}>취소</ModalNoBtn>
        <ModalYesBtn onClick={recordCreate}>작성</ModalYesBtn>
      </ModalBtns>

    </ModalContainer>
    </BackDrop>
  );
}

export default RecordCreateModal;
