import { styled } from "styled-components";


const SearchBoxDesign = styled.div`
  display: flex;
  height: 80%;
  align-self: center;
  justify-content: space-around;
  width: 20vw;
  /* border: dotted 1px yellow; */
  `;

const SelectDesign = styled.select`
  display: flex;
  width: 5vw;
  border: solid 1px white;
  border-radius: 10px;
  font-size: 0.8vw;
  background-color: black;
  color: white;
  `;

const InputBoxDesign = styled.form`
  display: flex;
  justify-content: center;
  width: 14vw;
  border: solid 1px white;
  font-size: 0.8vw;
  background-color: black;
  border-radius: 10px;
  /* border: solid 1px red; */
`;

const InputBoxIpt = styled.input`
  display: flex;
  width: 10vw;
  font-size: 0.8vw;
  background-color: black;
  color: white;
  /* border: solid 1px white; */
`;

const InputBoxBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3vw;
  background-color: black;
  /* border: solid 1px white; */
`;

export {
    SearchBoxDesign,
    SelectDesign,
    InputBoxDesign,
    InputBoxBtn,
    InputBoxIpt
}