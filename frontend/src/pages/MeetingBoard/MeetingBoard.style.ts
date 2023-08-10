import { styled } from "styled-components";

export const Container = styled.div`
  width: 65%;
  height: 60%;
  margin: 0 auto;
  margin-top: 10px;
`;

export const Title = styled.div`
  margin-left: 1%;
  color: #ffffff;
`;

export const H1 = styled.h1`
  display: inline;
`;
export const H3 = styled.h3`
  display: inline;
  margin-left: 2%;
`;

export const LeftDiv = styled.div`
  float: left;
  width: 19%;
  height: 40%;
  margin: 3px 1px 0px 0px;
`;

export const TagButton = styled.div<{ $IsClick: boolean }>`
  background-color: transparent;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  color: #6c6c6c;
  font-size: 14px;
  font-weight: bold;
  margin: 0px 5px 12px 5px;
  padding: 8px;

  &:hover {
    transform: scale(1.05);
    transition: 0.3s;
  }
  color: ${(props) => (props.$IsClick ? "white" : "#6C6C6C")};
  border: solid ${(props) => (props.$IsClick ? "1px white" : "1px #6C6C6C")};
`;

export const SearchDiv = styled.div`
  position: relative;
  height: 30px;
  margin: 20px 14px 10px 10px;
`;

export const CreateRoom = styled.button`
  float: right;
  height: 25px;
  width: 100px;
  background-color: #22505B;
  border-radius: 10px;
  border: none;
  color: white;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

export const SearchInput = styled.input`
  float: right;
  background-color: #444444;
  border: none;
  border-radius: 5px;
  height: 23px;
`;

export const SearchInputButton = styled.img`
  position: absolute;
  height: 14px;
  width: 14px;
  right: 128px;
  top: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

export const RightDiv = styled.div`
  float: left;
  width: 80%;
  height: 90%;
`;
