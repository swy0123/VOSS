import { styled } from "styled-components";
import { ChangeEvent, useEffect, useState, useCallback, KeyboardEvent } from "react";
import { BackGroundImg } from "../../components/BackGroundImg";
import Header from "../../components/Header/Header";
import Messenger from "../../components/Message/Messenger";
import MeetingList from "../../components/Meeting/MeetingList";
import SearchInputImg from "../../assets/MeetingBoard/SearchInput.png";
import AddMeetModal from "../Meeting/AddMeetModal/AddMeetModal";
import {
  Container,
  CreateRoom,
  LeftDiv,
  RightDiv,
  SearchDiv,
  SearchInput,
  SearchInputButton,
  TagButton,
  Title,
} from "./MeetingBoard.style";

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
  const Tag = ["더빙 연습", "기타"];
  const TagCode = ["DUB", "FREE"];
  const [selectedTag, setTag] = useState<string>("");
  const [searchForm, setSearch] = useState("");
  const [meetingBoardProps, setMeetingBoardProps] = useState<MeetingBoardProps>(startProps);

  useEffect(() => {
    onClickSearchButton();
  }, [selectedTag]);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const handleSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategory = (index: number) => {
    if (selectedTag == TagCode[index]) setTag("");
    else setTag(TagCode[index]);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log("키 입력");
    console.log(e.key);
    if (e.key === "Enter") {
      onClickSearchButton();
    }
  };

  const onClickSearchButton = () => {
    const newKeyWord = {
      title: searchForm,
      category: selectedTag,
    };
    console.log(newKeyWord);
    console.log("isClickedSearchButton");
    setMeetingBoardProps(newKeyWord);
  };

  return (
    <BackGroundImg>
      <Header />
      <Container>
        <Title>
          <h2>화상 연습</h2>
          <h4>방 목록</h4>
        </Title>
        <SearchDiv>
          {/* <form> */}
          <SearchInput
            type="text"
            onChange={handleSearchForm}
            onKeyPress={handleOnKeyPress}
            value={searchForm}
            placeholder="검색"
          />
          <SearchInputButton src={SearchInputImg} onClick={onClickSearchButton}></SearchInputButton>
          <CreateRoom onClick={onClickToggleModal}>+ 방 만들기</CreateRoom>
          {/* </form> */}
        </SearchDiv>

        <LeftDiv>
          {Tag.map((data, index) => (
            <TagButton
              key={index}
              $IsClick={selectedTag == TagCode[index]}
              onClick={() => handleCategory(index)}
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
