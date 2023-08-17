import styled from "styled-components";


export const RecordScrollDesign = styled.div`
  width: 100vw;
  height: calc(100vh - 65px);
  color: white;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  /* border: solid 1px red; */
  `;

export const RecordMainDesign = styled.div`
  margin: 0 auto;
  width: 1005px;
  color: white;
  margin-top: 40px;
  /* border: solid 1px white; */
  `;

export const MenuBoxDesign = styled.div`
display: flex;
justify-content: space-between;
width: 1000px;
height: 30px;
/* border: dotted 1px red; */
`;

export const CreateBtnDesign = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 86px;
height: 30px;
font-size: 15px;
background-color: rgba(34, 80, 91, 0.7);
border-radius: 8px;
cursor: pointer;
/* border: dotted 1px red; */
img {
  margin-right: 5px;
  width: 15px;
  height: 15px;
}
`;

export const SearchboxDesign = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
  /* border: solid 1px white; */
  `;

export const SearchSelectDesign = styled.select`
  display: flex;
  align-self: center;
  width: 86px;
  height: 30px;
  margin-right: 10px;
  color: white;
  font-size: 13px;
  background-color: #313131;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  `;

export const InputBoxDesign = styled.form`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 200px;
  height: 30px;
  font-size: 10px;
  border: solid 1px #EFEFEF;
  background-color: rgba(239, 239, 239, 0.2);
  border-radius: 5px;
  border: none;
  /* border: solid 1px white; */
  `;

export const InputBoxIpt = styled.input`
  display: flex;
  width: 150px;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  /* border: solid 1px white; */
  &::placeholder {
    color: rgba(239, 239, 239, 0.8);
  }
  `;

export const InputBoxBtn = styled.button`
  border: solid 1px white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  img {
    cursor: pointer;
    width: 15px;
  }
  `;

export const OrderSelectDesign = styled.select`
  display: flex;
  align-self: center;
  width: 86px;
  height: 30px;
  color: white;
  font-size: 13px;
  background-color: #313131;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export const RecordContentDesign = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: 20px;
  width: 1005px;
  overflow: auto;
  /* border: solid 1px green;  */
`;