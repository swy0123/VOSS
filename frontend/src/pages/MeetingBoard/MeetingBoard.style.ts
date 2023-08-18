import { styled } from "styled-components";

export const Container = styled.div`
  width: 65%;
  height: 60%;
  margin: 0 auto;
  margin-top: 40px
`;

export const Title = styled.div`
  margin-left: 1%;
  color: #ffffff;
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
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: 0.3s;
  }
  color: ${(props) => (props.$IsClick ? "white" : "#6C6C6C")};
  border: solid ${(props) => (props.$IsClick ? "1px white" : "1px #6C6C6C")};
`;

export const SearchDiv = styled.div`
display: flex;
justify-content: end;
align-items: center;
  position: relative;
  height: 30px;
  margin: 20px 14px 10px 10px;
`;

export const CreateRoom = styled.button`
  float: right;
  height: 28px;
  width: 100px;
  background-color: #22505B;
  border-radius: 5px;
  border: none;
  color: white;
  margin-left: 10px;
  margin-right: 10px;
  /* font-weight: 600; */
  font-size: 14px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

export const SearchInput = styled.input`
  float: right;
  padding-left: 5px;
  background-color: rgba(239, 239, 239, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  height: 23px;
  outline: none;
`;

export const SearchInputButton = styled.img`
  position: absolute;
  height: 14px;
  width: 14px;
  right: 128px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: 0.2s;
  }
`;

export const RightDiv = styled.div`
  float: left;
  width: 80%;
  height: 90%;
`;
