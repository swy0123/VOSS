import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { BackGroundImg } from "../components/BackGroundImg";
import Header from "../components/Header/Header";
import Messenger from "../components/Message/Messenger";
import MeetingList from "../components/Meeting/MeetingList";
import SearchInputImg from "../assets/MeetingBoard/SearchInput.png";
import TrainingDubbing from "./TrainingDubbing";

const Container = styled.div`
background-color: white;
  width: 100%;
  height: 60%;
  margin-top: 50px;
`;

const Title = styled.div`
  margin-left: 1%;
  color: #494949;
`;

const H1 = styled.h1`
display: inline;
  margin-left: 8%;
  
`;
const H3 = styled.h3`
display: inline;
  margin-left: 2%;
`;

const LeftDiv = styled.div`
background-color: red;
  float: left;
  width: 15%;
  height: 40%;
  margin-left: 8%;
  margin-top: 2%;
`;

const SearchDiv = styled.div`
height: 30px;
position: relative;

`;

const CrateRoom = styled.button`
float: right;

`;

const SearchInput = styled.input`
float: right;
background-color: gray;
border-radius: 5px;
height: 20px;

`;

const SearchInputButton = styled.img`
position: absolute;
right: 100px;


`;


const RightDiv = styled.div`
background-color: blue;
  float: left;
  width: 60%;
  height: 80%;
  margin: 2%;
`;



function MeetingBoard() {
  const Category = ["voice", "dubbing", "etc"];
  const [selectedCategory, setCategory] = useState([false, false, false]);



  return (
    <BackGroundImg>
      <Header />
      <Container>
        <Title>
          <H1>화상 연습</H1>
          <H3>방 목록</H3>
        </Title>

        <LeftDiv>
        </LeftDiv>
        <RightDiv>
          <SearchDiv>
            <CrateRoom>+방만들기</CrateRoom>
            <SearchInput type="text" />
            <SearchInputButton src={SearchInputImg}></SearchInputButton>
          </SearchDiv>
          <MeetingList></MeetingList>
        </RightDiv>
      </Container>

      <Messenger />
    </BackGroundImg>
  )
}
export default MeetingBoard;