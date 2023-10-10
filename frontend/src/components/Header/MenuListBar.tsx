import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { postRractice } from "/src/api/profile";
import { useRecoilState } from "recoil";
import { FreeBoardListState, FreeBoardInputState, FreeBoardSortState, FreeBoardCondState, FreeBoardCurrentPageState, FreeBoardTotalPagesState } from "/src/recoil/Community";
import { getPostList } from "/src/api/FreeBoard";
import { PostListType } from "/src/type/FreeBoard";
import {
  MenuBox,
  Menuitems,
  Item,
} from "./MenuListBar.style";


interface Headertype {
  setMenuIsShown : Dispatch<SetStateAction<boolean>>
}

function MenuListBar({setMenuIsShown}:Headertype) {
  const [, setInput] = useRecoilState<string>(FreeBoardInputState);
  const [, setSort] = useRecoilState<string>(FreeBoardSortState);
  const [, setCond] = useRecoilState<string>(FreeBoardCondState);
  const [, setCurrentPage] = useRecoilState<number>(FreeBoardCurrentPageState);
  const [, setTotalPages] = useRecoilState<number>(FreeBoardTotalPagesState);
  const [, setPosts] = useRecoilState<PostListType[]>(FreeBoardListState);
  const searchPost = (sort: string, cond: string, input:string, page: number) => {
    setCurrentPage(page)
    getPostList(sort, cond, input, page)
    .then((postsData) => {
      if(postsData) {
        setPosts(postsData.content)
        setTotalPages(postsData.totalPages)
        navigate("/freeboard")
      }
    return true
  })};

  // Router Link와 동일한 부분
  const navigate = useNavigate()  
  const goVoiceAnalysis = async () => {
    await postRractice("ACT")
    navigate("/analysis")
  }
  const goDubbingList = () => {
    navigate("/dubbinglist")
  }
  const goGame = () => {
    navigate("/game")
    location.reload();
  }
  const goAccent = async () => {
    await postRractice("DICTION")
    navigate("/accent")
  }
  const goFreeBoard = () => {
    setInput("");
    setSort("1");
    setCond("1");
    searchPost("1", "1", "", 1);
  }
  const goMeetingBoard = () => {
    navigate("/meeting")
  }
  const goRecordBoard = () => {
    navigate("/recordboard")
  }


  return(
    <MenuBox 
      onMouseEnter={() => setMenuIsShown(true)}
      onMouseLeave={() => setMenuIsShown(false)}>
      <Menuitems>
        <Item onClick={goVoiceAnalysis}>목소리 분석</Item>  
        <Item onClick={goDubbingList}>더빙 연습</Item>  
        <Item onClick={goAccent}>발음 연습</Item>  
      </Menuitems>

      <Menuitems>
        <Item onClick={goMeetingBoard}>화상 회의</Item>  
      </Menuitems>     
    
      <Menuitems>
        <Item onClick={goFreeBoard}>자유게시판</Item>  
        <Item onClick={goRecordBoard}>녹음게시판</Item>  
        <Item onClick={goGame}>목소리 마피아</Item>  
      </Menuitems>
    </MenuBox>
  )
}

export default MenuListBar