import { styled } from "styled-components";
import { BackGroundImg } from "../components/BackGroundImg";
import Header from "../components/Header/Header";
import Messenger from "../components/Message/Messenger";
import MeetingList from "../components/Meeting/MeetingList";
import SearchInputImg from "../assets/MeetingBoard/SearchInput.png";

const MeetingDiv = styled.div`
background-color: white;
  width: 100%;
  height: 60%;
  margin-top: 50px;
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

`;

const CrateRoom = styled.button`
float: left;

`;

const SearchInput = styled.input`
float: right;

`;

const SearchInputButton = styled.img`
float: right;

`;


const RightDiv = styled.div`
background-color: blue;
  float: left;
  width: 60%;
  height: 80%;
  margin: 2%;
`;

function MeetingBoard() {
  return (
    <BackGroundImg>
      <Header />

      <MeetingDiv>
        <LeftDiv>
        </LeftDiv>
        <RightDiv>
          <SearchDiv>
            <CrateRoom>+방만들기</CrateRoom>
            <SearchInputButton src={SearchInputImg}></SearchInputButton>
            <SearchInput type="text" />
          </SearchDiv>
          <MeetingList></MeetingList>
        </RightDiv>
      </MeetingDiv>

      <Messenger />
    </BackGroundImg>
  )
}
export default MeetingBoard;