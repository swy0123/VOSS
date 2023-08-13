import styled from "styled-components";


export const RecordScrollDesign = styled.div`
  margin-top: -2px;
  width: 100vw;
  height: 90vh;
  color: white;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  border: solid 1px red;
  `;

export const RecordMainDesign = styled.div`
  margin: 0 auto;
  width: 1000px;
  color: white;
  /* border: solid 1px white; */
  `;

export const OrderBoxDesign = styled.div`
display: flex;
justify-content: end;
width: 1000px;
height: 30px;
/* border: dotted 1px red; */
`;

export const OrderSelectDesign = styled.select`
  display: flex;
  align-self: center;
  width: 86px;
  /* height: 4vh; */
  height: 30px;
  color: white;
  font-size: 12px;
  background-color: #313131;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;