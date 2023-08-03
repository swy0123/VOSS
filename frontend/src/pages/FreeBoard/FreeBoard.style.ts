import { styled } from "styled-components";


export const FreeBoardDesign = styled.div`
  margin-left: 10vw;
  width: 80vw;
  color: white;
  /* border: dotted 1px yellow; */
`;

export const OrderBoxDesign = styled.div`
  display: flex;
  justify-content: end;
  width: 80vw;
  height: 3.8vh;
  /* border: dotted 1px red; */
`;

export const OrderSelectDesign = styled.select`
  display: flex;
  align-self: center;
  width: 6vw;
  height: 4vh;
  color: white;
  font-size: 0.8vw;
  background-color: #313131;
  border-radius: 5px;
  border: none;
`;

export const PostCategoryDesign = styled.div`
  /* border: solid 1px white; */
  display: flex;
  width: 80vw;
  height: 5.3vh;
  font-size: 0.8vw;
  border-bottom: solid 1px white;
`;


export const PostCategoryNumberDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8%;
  text-align: center;
  `;

export const PostCategoryLikeDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
`;

export const PostCategoryTitleDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  text-align: center;
  `;

export const PostCategoryUserDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 12%;
  text-align: center;
  `;

export const PostCategoryCreatedatDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  text-align: center;
`;

export const PostCategoryHitDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
`;

export const SearchboxDesign = styled.div`
  display: flex;
  justify-content: end;
  width: 80vw;
  height: 9vh;
  /* border: solid 1px white; */
  `;

export const SearchSelectDesign = styled.select`
  display: flex;
  width: 7vw;
  height: 4vh;
  align-self: center;
  margin-right: 1vw;
  font-size: 0.8vw;
  color: white;
  background-color: #313131;
  border-radius: 5px;
  border: none;
  `;

export const InputBoxDesign = styled.form`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 14vw;
  height: 4vh;
  font-size: 0.8vw;
  border: solid 1px #EFEFEF;
  background-color: rgba(239, 239, 239, 0.2);
  border-radius: 5px;
  border: none;
  `;

export const InputBoxIpt = styled.input`
  display: flex;
  width: 10vw;
  color: white;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  outline: none;
  &::placeholder {
    color: rgba(239, 239, 239, 0.8);
  }
`;

export const InputBoxBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3vw;
  background-color: transparent;
  border: none;
  border-radius: 10px;
`;

export const CreateSpaceDesign = styled.div`
  display: flex;
  align-self: center;
  width: 23.5vw;
  height: 4vh;
  /* border: dotted 1px yellow; */
`;

export const CreateBtnDesign = styled.div`
  align-self: center;
  margin-right: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 4vh;
  border: solid 1px white;
  border-radius: 5px;
  font-size: 0.8vw;
`;

export const PaginationWrapper = styled.ul`
display: flex;
list-style: none;
padding: 0;
margin: 0;
justify-content: center;
align-items: center;
`;

export const PaginationItem = styled.li`
cursor: pointer;
font-size: 1.1vw;
margin: 0 6px;
padding: 5px 5px;
color: #ffffff;
background-color: transparent;
transition: background-color 0.3s ease;

&:hover {
  background-color: #ccc;
}

&.active {
  background-color: #007bff;
}
`;