import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { RecordsState } from "/src/recoil/Community";
import { CurrentUserAtom } from "/src/recoil/Auth";
import { recordLike, playRecord, deleteRecord, deleteLike, getMyRecords } from "/src/api/recordBoard";
import PostLikeImg from "/src/assets/FreeBoard/PostLike.png";
import LikeItImg from "/src/assets/FreeBoard/LikeIt.png";
import {
  RecordContentDesign,
} from "/src/pages/RecordBoard/RecordBoard.style";
import {
  RecordItemDesign,
  RecordDeleteDesign,
  RecordTitleDesign,
  RecordPlayerDesign,
  RecordSpace1Design,
  RecordLikeImageDesign,
  RecordLikeNumDesign,
  RecordSpace2Design,
  RecordDateHitsDesign,
  RecordDateDesign,
  RecordHitsDesign,
  RecordUsersDesign
} from "/src/components/RecordBoard/RocordList.style"

const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com";

function RecordBoardData () {
  let rawday = new Date();
  rawday.setHours(rawday.getUTCHours() + 9);
  const today = rawday.toISOString();
  const id = parseInt(useParams().id || "");
  const me = useRecoilValue(CurrentUserAtom).userid;
  const [records, setRecords] = useRecoilState(RecordsState);
  const [isTrash, setTrash] = useState(false);

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

  const DateDisplay = ( dateString: string ) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return (`${year}년 ${month}월 ${day}일`)
  };

  const recordDelete = (recordId: number) => {
    deleteRecord(recordId).then((data) => {
      if (data) {
        setRecords((prevRecords) => (
          prevRecords.filter((record) => record.recordId !== recordId)
        ));
      }
    })
  };

  const searchPost = (memberId: number, page: number) => {
    getMyRecords(memberId, page).then((dataRecords) => {
      if (dataRecords) {
        setRecords(dataRecords.content)
      }
    });
  };

  useEffect(() => {
    searchPost(id, 1);
  },[])

  return(
    <RecordContentDesign>
    { records.length
    ?
    <>{records.map((record) => (
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

        <RecordTitleDesign>{record.description}</RecordTitleDesign>
        
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
        </RecordUsersDesign>
    </RecordItemDesign>
    ))}</>
    : <div style={{ margin: '0 auto', height: '20vw', textAlign: 'center', lineHeight: '20vw', fontSize: '1vw',}}>해당하는 게시글이 없습니다</div>
    }
    </RecordContentDesign>
  )
}

export default RecordBoardData;