import { useEffect, useState } from "react";
import { styled } from "styled-components";

const ListBox = styled.div`
  height: 90%;
  background-color: gray;
`;

const MeetingRoom = styled.div`
  width: 45%;
  height: 18%;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  margin: 0 1%;
  margin-top: 1px;
  float: left;
`;

interface ListProps {
  tags: boolean[];
  words: string;
}

interface MeetingDate {
  index: number;
  title: string;
  password: string;
  curMan: number;
  limit: number;
}

function MeetingList({ listProps }: { listProps: ListProps }) {
  const Tag = ["목소리 분석 연습", "더빙 연습", "기타"]; //이거도 전역 변수 만들어서 처리하면 좋을 듯?/

  const [meetingData, setDate] = useState<MeetingDate[]>([]);

  useEffect(() => {
    //props로 서버와 통신하여 검색 기록 불러오는 api
    const newList = [...data];

    setDate([...newList]);
  }, [listProps]);

  return (
    <ListBox>
      {meetingData.map((data, index) => (
        <MeetingRoom key={index}>
          {Tag[data.index]}
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
            {data}{index}
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
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
  { index: 0, title: "이제는.더이상.물러날곳이.없다", password: "1111", curMan: 4, limit: 6 },
];
