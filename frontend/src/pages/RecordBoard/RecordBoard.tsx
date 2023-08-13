import { getPostList } from "/src/api/FreeBoard"
import { useEffect, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackGroundImg } from "/src/components/BackGroundImg";
import Header from "/src/components/Header/Header";
import Messenger from "/src/components/Message/Messenger";
import PostList from "../../components/FreeBoard/PostList/PostList";
import { PostListType } from "/src/type/FreeBoard";
import { useRecoilState } from "recoil";
import { FreeBoardListState, FreeBoardInputState, FreeBoardSortState, FreeBoardCondState, FreeBoardCurrentPageState, FreeBoardTotalPagesState, FreeBoardTotalElementsState } from "/src/recoil/Community";
import UpdateIcon from "/src/assets/Profile/UpdateIcon.png";
import RecordList from "/src/components/RecordBoard/RecordList";
import {
  RecordScrollDesign,
  RecordMainDesign,
  OrderBoxDesign,
  OrderSelectDesign,

} from "./RecordBoard.style";


function RecordBoard () {
  const navigate = useNavigate();
  const goPostCreate = () => navigate('/freeboard/create');
  const [input, setInput] = useRecoilState<string>(FreeBoardInputState);
  const [sort, setSort] = useRecoilState<string>(FreeBoardSortState);
  const [cond, setCond] = useRecoilState<string>(FreeBoardCondState);
  const [currentPage, setCurrentPage] = useRecoilState<number>(FreeBoardCurrentPageState);
  const [totalPages, setTotalPages] = useRecoilState<number>(FreeBoardTotalPagesState);
  const [totalElements, setTotalElements] = useRecoilState<number>(FreeBoardTotalElementsState);
  const [posts, setPosts] = useRecoilState<PostListType[]>(FreeBoardListState);


  return(
    <BackGroundImg>
      <Header/>
      <RecordScrollDesign>
      <RecordMainDesign>
        <h2 style={{ cursor: 'pointer'}}>녹음 게시판</h2>

        <OrderBoxDesign>
        <OrderSelectDesign id="sort-select" value={sort} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSort(event.target.value)}>
            <option value="1">최신순</option>
            <option value="2">조회순</option>
            <option value="3">좋아요순</option>
          </OrderSelectDesign>
        </OrderBoxDesign>

        <RecordList></RecordList>

      </RecordMainDesign>
      </RecordScrollDesign>
      <Messenger/>
    </BackGroundImg>
  )
}

export default RecordBoard;