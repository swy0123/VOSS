import { useEffect, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import { useRecoilState } from "recoil";
import { RecordsState, RecordBoardInputState, RecordBoardSortState, RecordBoardCondState, ShowRecordCreateModalState } from "/src/recoil/Community";
import { getRecords } from "/src/api/recordBoard";
import RecordList from "/src/components/RecordBoard/RecordList";
import RecordCreateModal from "/src/components/RecordBoard/RecordCreateModal";
import {
  RecordScrollDesign,
  RecordMainDesign,
  MenuBoxDesign,
  SearchboxDesign,
  SearchSelectDesign,
  CreateBtnDesign,
  InputBoxDesign,
  InputBoxIpt,
  InputBoxBtn,
  OrderSelectDesign,
} from "./RecordBoard.style";


function RecordBoard () {
  const [input, setInput] = useRecoilState(RecordBoardInputState);
  const [sort, setSort] = useRecoilState(RecordBoardSortState);
  const [cond, setCond] = useRecoilState(RecordBoardCondState);
  const [records, setRecords] = useRecoilState(RecordsState);
  const [showCreateModal, setShowCreateModal] = useRecoilState(ShowRecordCreateModalState);

  const clickSearchBtn = (event: FormEvent) => {
    event.preventDefault();
    searchPost(sort, cond, input, 1);
  };

  const searchPost = (sort: string, cond: string, input:string, page: number) => {
    getRecords(sort, cond, input, page).then((dataRecords) => {
      if (dataRecords) {
        setRecords(dataRecords.content)
      }
    });
  }

  useEffect(() => {
    searchPost("1", "1", "", 1);
  }, [])

  useEffect(() => {
    searchPost(sort, cond, input, 1);
  },[sort])

  return(
    <BackGroundImg>
      <Header/>
      <RecordScrollDesign>
      <RecordMainDesign>
        <h2 style={{ cursor: 'pointer'}}>녹음 게시판</h2>

        <MenuBoxDesign>

          <CreateBtnDesign onClick={() =>setShowCreateModal(true)}>
            <img src="/src/assets/Profile/UpdateIcon.png" alt="UpdateIcon" />글 작성
          </CreateBtnDesign>

          
          <SearchboxDesign>
          <SearchSelectDesign id="cond-select" value={cond} onChange={(event: ChangeEvent<HTMLSelectElement>) => setCond(event.target.value)}>
            <option value="1">내용</option>
            <option value="2">작성자</option>
          </SearchSelectDesign>

          <InputBoxDesign onSubmit={clickSearchBtn}>
            <InputBoxIpt
              value={input}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)} 
              type="text" 
              placeholder="검색"/>
            <InputBoxBtn>
            <img src="/src/assets/MeetingBoard/SearchInput.png" alt=""/>
            </InputBoxBtn>
          </InputBoxDesign>
          </SearchboxDesign>

          <OrderSelectDesign id="sort-select" value={sort} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSort(event.target.value)}>
            <option value="1">최신순</option>
            <option value="2">재생순</option>
            <option value="3">추천순</option>
          </OrderSelectDesign>

        </MenuBoxDesign>

        <RecordList />

      </RecordMainDesign>

      { showCreateModal ? <RecordCreateModal/> : null }

      </RecordScrollDesign>
      <Messenger/>
    </BackGroundImg>
  )
}

export default RecordBoard;