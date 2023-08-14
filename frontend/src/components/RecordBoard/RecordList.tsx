import { useEffect, useState } from "react";
import {  } from "/src/recoil/Community";
import { getRecords, recordLike, deleteLike } from "/src/api/recordBoard";
import { RecordType } from "/src/type/FreeBoard";
import ProfileNull from "/src/assets/Profile/ProfileNull.png";
import PostLikeImg from "/src/assets/FreeBoard/PostLike.png";
import LikeItImg from "/src/assets/FreeBoard/LikeIt.png";
import {
  RecordContentDesign,
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
import { useNavigate } from "react-router-dom";

const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com";

function RecordList () {
  const today = new Date().toISOString();
  const [records, setRecords] = useState<RecordType[]>([]);
  
  const navigate = useNavigate();
  const goProfile = (id: number) => navigate(`/profile/${id}`)

  const LikeRecord = (recordId: number, liked: boolean) => {
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

  const DateDisplay = ( dateString: string ) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return (`${year}년 ${month}월 ${day}일`)
  };

  useEffect(() => {
    getRecords("1", "1", "", 1).then((dataRecords) => {
      if (dataRecords) {
        setRecords(dataRecords.content)
      }
    });
  }, [])

  return(
    <RecordContentDesign>

      { records.map((record) => (
        <RecordItemDesign key={record.recordId}>
          <RecordTitleDesign>{record.description}</RecordTitleDesign>
          <RecordPlayerDesign>
            {record.savedFileName.slice(-4)}
          </RecordPlayerDesign>

          <RecordSpace1Design/>
          <RecordLikeImageDesign onClick={()=>LikeRecord(record.recordId, record.liked)}>
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
            <img src={ record.imageUrl ? `${FILE_SERVER_URL}/${record.imageUrl}` : ProfileNull} alt="" />
            <span onClick={()=>goProfile(record.memberId)}>{record.nickname}</span>
          </RecordUsersDesign>
        </RecordItemDesign>
      ))}


    </RecordContentDesign>
  )
}

export default RecordList;