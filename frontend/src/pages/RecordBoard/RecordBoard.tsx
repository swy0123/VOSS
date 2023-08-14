import { useEffect, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import { useRecoilState } from "recoil";
import { RecordBoardInputState, RecordBoardSortState, RecordBoardCondState, RecordBoardCurrentPageState } from "/src/recoil/Community";
import UpdateIcon from "/src/assets/Profile/UpdateIcon.png";
import RecordList from "/src/components/RecordBoard/RecordList";
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
  const navigate = useNavigate();
  const goRecordCreate = () => navigate('/recordboard/create');
  const [input, setInput] = useRecoilState<string>(RecordBoardInputState);
  const [sort, setSort] = useRecoilState<string>(RecordBoardSortState);
  const [cond, setCond] = useRecoilState<string>(RecordBoardCondState);
  const [currentPage, setCurrentPage] = useRecoilState<number>(RecordBoardCurrentPageState);


  return(
    <BackGroundImg>
      <Header/>
      <RecordScrollDesign>
      <RecordMainDesign>
        <h2 style={{ cursor: 'pointer'}}>녹음 게시판</h2>

        <MenuBoxDesign>

          <CreateBtnDesign onClick={() =>goRecordCreate()}>
            <img src={UpdateIcon} alt="UpdateIcon" />글 작성
          </CreateBtnDesign>

          
          <SearchboxDesign>
          <SearchSelectDesign id="cond-select" value={cond} onChange={(event: ChangeEvent<HTMLSelectElement>) => setCond(event.target.value)}>
            <option value="1">제목</option>
            <option value="2">작성자</option>
          </SearchSelectDesign>
          <InputBoxDesign>
            <InputBoxIpt
              value={input}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
              // onKeyPress={enterKeyDown} 
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
            <option value="3">좋아요순</option>
          </OrderSelectDesign>

        </MenuBoxDesign>

        <RecordList></RecordList>

      </RecordMainDesign>
      </RecordScrollDesign>
      <Messenger/>
    </BackGroundImg>
  )
}

export default RecordBoard;