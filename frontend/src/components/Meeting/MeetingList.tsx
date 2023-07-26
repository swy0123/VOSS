import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

const ListBox = styled.div`
  height: 90%;
  background-color: gray;
`;

const MeetingRoom = styled.div`
  width: 47%;
  height: 17%;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  margin: 3px 7px;
  float: left;
`;

interface ListProps {
  tags: boolean[];
  words: string;
}

interface MeetingData {
  index: number;
  type: number;
  title: string;
  password: string;
  curMan: number;
  limit: number;
}

function MeetingList({ listProps }: { listProps: ListProps }) {
  const Tag = ["목소리 분석 연습", "더빙 연습", "기타"]; //이거도 전역 변수 만들어서 처리하면 좋을 듯?/
  const navigate = useNavigate();

  const [meetingData, setDate] = useState<MeetingData[]>([]);

  useEffect(() => {
    //props로 서버와 통신하여 검색 기록 불러오는 api
    const newList = [...data];

    setDate([...newList]);
  }, [listProps]);

  const goPostDetail = (id: number) => navigate(`/meeting/${id}`);
  

  return (
    <ListBox>
      {meetingData.map((data, index) => (
        <MeetingRoom key={index} onClick={()=>(goPostDetail(data.index))}>
          {Tag[data.type]}
          {data.title}
          {data.password}
          <br></br>
          {data.curMan}/{data.limit}
        </MeetingRoom>
      ))}
      <div>
        {/* 테스트 */}
        {/* {listProps.tags.map((data, index) => (
          <div key={index}>
            {index}{data}
            {data ? Tag[index] : ""}
          </div>
        ))}
        {listProps.words} */}
      </div>
    </ListBox>
  );
}

export default MeetingList;

const data = [
  { index: 0, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 1, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 2, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 4, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 5, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 6, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 7, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 8, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 9, type: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
];
