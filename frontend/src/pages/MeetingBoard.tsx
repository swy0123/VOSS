import { styled } from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import { BackGroundImg } from "../components/BackGroundImg";
import Header from "../components/Header/Header";
import Messenger from "../components/Message/Messenger";
import MeetingList from "../components/Meeting/MeetingList";
import SearchInputImg from "../assets/MeetingBoard/SearchInput.png";

const Container = styled.div`
  background-color: #a1a1a1;
  width: 70%;
  height: 60%;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.div`
  margin-left: 1%;
  color: #FFFFFF;
`;

const H1 = styled.h1`
  display: inline;
`;
const H3 = styled.h3`
  display: inline;
  margin-left: 2%;
`;

const LeftDiv = styled.div`
  float: left;
  width: 18%;
  height: 40%;
`;

const TagButton = styled.div<{ $IsClick: boolean }>`
  background-color: transparent;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  color: #6c6c6c;
  font-size: 15px;
  font-weight: bold;
  margin: 10px;
  padding: 8px;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
  color: ${(props) => (props.$IsClick ? "white" : "#6C6C6C")};
  border: solid ${(props) => (props.$IsClick ? "2px white" : "1px #6C6C6C")};
`;

const SearchDiv = styled.div`
position: relative;
  height: 30px;
  margin: 1%;
`;

const CreateRoom = styled.button`
  float: right;
  margin-left: 20px;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  float: right;
  background-color: gray;
  border-radius: 5px;
  height: 20px;
`;

const SearchInputButton = styled.img`
  position: absolute;
  height: 20px;
  right: 110px;
`;

const RightDiv = styled.div`
  background-color: blue;
  float: left;
  width: 80%;
  height: 80%;
`;
interface ListProps {
  tags: boolean[];
  words: string;
}
function MeetingBoard() {
  const startProps = {
    tags:[true, true, true],
    words:""
  }
  const Tag = ["목소리 분석 연습", "더빙 연습", "기타"];
  const [selectedTag, setTag] = useState<boolean[]>([true, true, true]);
  const [searchForm, setSearch] = useState("");
  const [listProps, setListProps] = useState<ListProps>(startProps);

  useEffect(() => {
    const newKeyWord = {
      tags:selectedTag,
      words:searchForm
    }
    setListProps(newKeyWord);
  }, []);

  const handleTagButton = (index: number) => {
    const newTagList = [...selectedTag];
    newTagList[index] = !newTagList[index];
    setTag(newTagList);
  };

  const handleSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearchButton = () =>{
    const newKeyWord = {
      tags:selectedTag,
      words:searchForm
    }
    setListProps(newKeyWord);
  }

  return (
    <BackGroundImg>
      <Header />
      <Container>
        <Title>
          <H1>화상 연습</H1>
          <H3>방 목록</H3>
        </Title>
        <SearchDiv>
          <CreateRoom>+방만들기</CreateRoom>
          <SearchInput type="text" onChange={handleSearchForm} value={searchForm} />
          <SearchInputButton src={SearchInputImg} onClick={onClickSearchButton}></SearchInputButton>
        </SearchDiv>

        <LeftDiv>
          {Tag.map((data, index) => (
            <TagButton
              key={index}
              $IsClick={selectedTag[index]}
              onClick={() => handleTagButton(index)}
            >
              {data}
            </TagButton>
          ))}
        </LeftDiv>
        <RightDiv>
          <MeetingList listProps={listProps}></MeetingList>
        </RightDiv>
      </Container>

      <Messenger />
    </BackGroundImg>
  );
}
export default MeetingBoard;
