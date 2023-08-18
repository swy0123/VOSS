import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { getRecords, recordLike, playRecord, deleteRecord, deleteLike } from "/src/api/recordBoard";
import { RecordsState, RecordBoardInputState, RecordBoardSortState, RecordBoardCondState, RecordBoardCurrentPageState } from "/src/recoil/Community";
import ConfirmContext from "/src/context/confirm/ConfirmContext";
import ProfileNull from "/src/assets/Profile/ProfileNull.png";
import PostLikeImg from "/src/assets/FreeBoard/PostLike.png";
import LikeItImg from "/src/assets/FreeBoard/LikeIt.png";
import {
  RecordContentDesign,
  RecordDeleteDesign,
  RecordItemDesign,
  RecordTitleDesign,
  RecordPlayerDesign,
  RecordSpace1Design,
  RecordLikeImageDesign,
  RecordLikeNumDesign,
  RecordDateHitsDesign,
  RecordSpace2Design,
  RecordDateDesign,
  RecordHitsDesign,
  RecordUsersDesign,
} from "./RocordList.style";

const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com";

const RecordList = () => {
  const containerRef = useRef(null);
  let rawday = new Date();
  rawday.setHours(rawday.getUTCHours() + 9);
  const today = rawday.toISOString();
  const me = useRecoilValue(CurrentUserAtom).userid

  const [input, setInput] = useRecoilState(RecordBoardInputState);
  const [sort, setSort] = useRecoilState(RecordBoardSortState);
  const [cond, setCond] = useRecoilState(RecordBoardCondState);
  
  const [records, setRecords] = useRecoilState(RecordsState);
  const [isTrash, setTrash] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useRecoilState(RecordBoardCurrentPageState);
  const [currentPage, setCurrentPage] = useState(1);
  const { confirm: confirmComp } = useContext(ConfirmContext);
  
  const navigate = useNavigate();
  const goProfile = (id: number) => navigate(`/profile/${id}`)

  const likeRecord = (recordId: number, liked: boolean) => {
    if (!liked) {
      recordLike(recordId).then(dataLike => {
        if (dataLike) {
          const updatedRecords = records.map(record => {
          if (record.recordId === recordId) {
            return {...record, liked: true, likes: record.likes+1}
            }
          return record
          }); 
          setRecords(updatedRecords)
        };
      });
    } else {
      deleteLike(recordId).then(dataLike => {
        if (dataLike) {
          const updatedRecords = records.map(record => {
          if (record.recordId === recordId) {
            return {...record, liked: false, likes: record.likes-1}
            }
          return record
          }); 
          setRecords(updatedRecords)
        };
      });
    };
  }

  const recordPlay = (recordId: number) => {
    playRecord(recordId).then((data) => {
      if (data) {
        setRecords((prevRecords) => {
          return prevRecords.map((record) => {
            if (record.recordId === recordId) {
              return { ...record, hits: record.hits + 1 };
            }
            return record;
          });
        });
      }
    });
  };

  const onConfirmClick = async (text:string)  => {
    const result = await confirmComp(text);
      console.log("custom", result);
    return result;
  };

  const recordDelete = async (recordId: number) => {
    const ret = await onConfirmClick("녹음글을 삭제하시겠습니까?");
    if(ret) {
      deleteRecord(recordId).then((data) => {
        if (data) {
          setRecords((prevRecords) => (
            prevRecords.filter((record) => record.recordId !== recordId)
          ));
        };
      });
    };
  };

  const DateDisplay = ( dateString: string ) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return (`${year}년 ${month}월 ${day}일`)
  };

  const handleScroll = (currentPage) => {
    if (isLoading) return;
    const container = containerRef.current;

    if (container) {
      const scrollOffset = container.scrollHeight - container.clientHeight;
      const currentScroll = container.scrollTop;

      if (currentScroll >= scrollOffset) {
        if (isLoading) return;
        setLoading(true)
        setCurrentPage(prevPage => prevPage + 1);
        getRecords(sort, cond, input, currentPage + 1).then((dataRecords) => {
          if (dataRecords) {
            if ( !dataRecords.content.length ) {
              setLoading(true);
              return;
            } else {
              setLoading(false);
              setRecords(prev => [...prev, ...dataRecords.content])
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const scrollHandler = () => handleScroll(currentPage);
    container.addEventListener("scroll", scrollHandler);
    return () => {
      container.removeEventListener("scroll", scrollHandler);
    };
  }, [currentPage]);

  return(
    <RecordContentDesign ref={containerRef}>
    { records.length
    ? <>
      { records.map((record) => (
      <RecordItemDesign key={record.recordId}>

      <RecordDeleteDesign>
        { me == record.memberId
        ? <img src={ isTrash ? "/src/assets/Training/trashcan(del).png" : "/src/assets/Training/trashcan.png" } alt=""
          onMouseEnter={()=>setTrash(true)}
          onMouseLeave={()=>setTrash(false)}
          onClick={()=>recordDelete(record.recordId)}
        />
        : <div style={{ height: '18px'}}></div>
        }
      </RecordDeleteDesign>

      <RecordTitleDesign>
        {record.description}
      </RecordTitleDesign>
      
      <RecordPlayerDesign>
        <audio controls onPlay={()=>(recordPlay(record.recordId))}>
          <source src={`${FILE_SERVER_URL}/${record.savedFileName}`} type="audio/ogg" />
          <source src={`${FILE_SERVER_URL}/${record.savedFileName}`} type="audio/mpeg" />
        </audio>
      </RecordPlayerDesign>

      <RecordSpace1Design/>
      <RecordLikeImageDesign onClick={()=>likeRecord(record.recordId, record.liked)}>
        { record.liked ? <img src={LikeItImg} alt="LikeIT"/> : <img src={PostLikeImg} alt="PostLikeimg"/>}
      </RecordLikeImageDesign>
      <RecordLikeNumDesign>{record.likes}</RecordLikeNumDesign>
      <RecordSpace2Design/>

      <RecordDateHitsDesign>
        <RecordDateDesign>
        { today.slice(2, 10) === record.createdAt?.slice(2, 10)
        ? record.createdAt?.slice(11, 16)
        : DateDisplay(record.createdAt)
        }
        </RecordDateDesign>
        <RecordHitsDesign>
          재생수 {(record.hits.toLocaleString())}회
        </RecordHitsDesign>
      </RecordDateHitsDesign>

      <RecordUsersDesign>
        <img onClick={()=>goProfile(record.memberId)} src={ record.profileImage ? `${FILE_SERVER_URL}/${record.profileImage}` : ProfileNull} alt="" />
        <span onClick={()=>goProfile(record.memberId)}>{record.nickname}</span>
      </RecordUsersDesign>
      </RecordItemDesign>
      ))}</>
    : <div style={{ margin: '0 auto', height: '20vw', textAlign: 'center', lineHeight: '20vw', fontSize: '1vw',}}>해당하는 게시글이 없습니다</div>
    }
    </RecordContentDesign>
  )
}

export default RecordList;