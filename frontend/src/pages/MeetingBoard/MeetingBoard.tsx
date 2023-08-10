import { styled } from "styled-components";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { BackGroundImg } from "../../components/BackGroundImg";
import Header from "../../components/Header/Header";
import Messenger from "../../components/Message/Messenger";
import MeetingList from "../../components/Meeting/MeetingList";
import SearchInputImg from "../../assets/MeetingBoard/SearchInput.png";
import AddMeetModal from "../Meeting/AddMeetModal/AddMeetModal";
import { Container, CreateRoom, H1, H3, LeftDiv, RightDiv, SearchDiv, SearchInput, SearchInputButton, TagButton, Title } from "./MeetingBoard.style";


export interface MeetingBoardProps {
  title: string;
  category: string;
}

// title=미팅&category=DUB&page=0&limit=10
function MeetingBoard() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const startProps = {
    title: "",
    category: "",
  };
  const Tag = ["목소리 분석 연습", "더빙 연습", "기타"];
  const TagCode = ["DUB", "PRACTICE", "FREE"];
  const [selectedTag, setTag] = useState<number>(0);
  const [searchForm, setSearch] = useState("");
  const [meetingBoardProps, setMeetingBoardProps] = useState<MeetingBoardProps>(startProps);

  const handleTagButton = (index: number) => {
    // const newTagList = [false, false, false]
    setTag(index);
  };
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const handleSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearchButton = () => {
    const newKeyWord = {
      title: searchForm,
      category: TagCode[selectedTag],
    };
    console.log(newKeyWord)
    console.log("isClickedSearchButton");
    setMeetingBoardProps(newKeyWord);
  };

  return (
    <BackGroundImg>
      <Header />
      <Container>
        <Title>
          <H1>화상 연습</H1>
          <H3>방 목록</H3>
        </Title>
        <SearchDiv>
          <CreateRoom onClick={onClickToggleModal}>+ 방 만들기</CreateRoom>
          <SearchInput type="text" onChange={handleSearchForm} value={searchForm} placeholder="검색"/>
          <SearchInputButton src={SearchInputImg} onClick={onClickSearchButton}></SearchInputButton>
        </SearchDiv>

        <LeftDiv>
          {Tag.map((data, index) => (
            <TagButton
              key={index}
              $IsClick={selectedTag==index}
              onClick={() => handleTagButton(index)}
            >
              {data}
            </TagButton>
          ))}
        </LeftDiv>
        <RightDiv>
          <MeetingList meetingBoardProps={meetingBoardProps}></MeetingList>
        </RightDiv>
      </Container>

      {isOpenModal && (
        <AddMeetModal onClickToggleModal={onClickToggleModal}>방 만들기</AddMeetModal>
      )}

      <Messenger />
    </BackGroundImg>
  );
}
export default MeetingBoard;
