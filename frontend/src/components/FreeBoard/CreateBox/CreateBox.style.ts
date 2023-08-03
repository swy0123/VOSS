import { styled } from "styled-components";


const CreateBoxDesign = styled.div`
  display: flex;
  height: 80%;
  align-self: center;
  justify-content: end;
  width: 32vw;
  /* border: dotted 1px yellow; */
  `;

const CreateBtnDesign = styled.div`
  margin-right: 1vw;
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 80%;
  border: solid 1px white;
  border-radius: 10px;
  font-size: 0.8vw;
  `;


export {
  CreateBoxDesign,
  CreateBtnDesign
}