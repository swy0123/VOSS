import { useEffect, useState } from "react";
import { getRecords } from "/src/api/recordBoard";

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

function RecordList () {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const goProfile = (id: number) => navigate(`/profile/${id}`)

  useEffect(() => {
    getRecords("1", "1", "", 1).then((dataRecords) => {
      if (dataRecords) {
        setRecords(dataRecords.content)
      };
    });
  }, [])

  return(
    <RecordContentDesign>

      { records.map((record) => (
        <RecordItemDesign key={record.recordId}>
          <RecordTitleDesign>{record.description}</RecordTitleDesign>
          <RecordPlayerDesign>{record.originalFileName}</RecordPlayerDesign>

          <RecordSpace1Design/>
          <RecordLikeImageDesign></RecordLikeImageDesign>
          <RecordLikeNumDesign>{record.likes}</RecordLikeNumDesign>
          <RecordSpace2Design/>

          <RecordDateHitsDesign>
            <RecordDateDesign>{record.createdAt}</RecordDateDesign>
            <RecordHitsDesign>{record.hits}</RecordHitsDesign>
          </RecordDateHitsDesign>

          <RecordUsersDesign><span onClick={()=>goProfile(record.memberId)}>{record.nickname}</span></RecordUsersDesign>
        </RecordItemDesign>
      ))};


    </RecordContentDesign>
  )
}

export default RecordList;