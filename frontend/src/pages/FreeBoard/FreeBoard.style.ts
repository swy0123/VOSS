import { styled } from "styled-components";

export const FreeScrollDesign = styled.div`
  width: 100vw;
  height: calc(100vh - 65px);
  color: white;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  /* border: solid 1px red; */
  `;

export const FreeBoardDesign = styled.div`
  margin-left: 15vw;
  width: 70vw;
  color: white;
  margin-top: 40px;
  /* border: dotted 1px yellow; */
`;

export const OrderBoxDesign = styled.div`
  display: flex;
  justify-content: end;
  width: 70vw;
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
  cursor: pointer;
`;

export const PostCategoryDesign = styled.div`
  display: flex;
  width: 70vw;
  height: 5.3vh;
  font-size: 0.8vh;
  border-bottom: solid 1px #6c6c6c;
  /* border: solid 1px white; */
`;


export const PostCategoryNumberDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8%;
  text-align: center;
  `;

export const PostCategoryTitleDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  `;

export const PostCategoryUserDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items : center;
  width: 10%;
  `;

export const PostCategoryCreatedatDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items : center;
  width: 16%;
`;

export const PostCategoryHitDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8%;
`;

export const PostCategoryLikeDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8%;
`;

export const SearchboxDesign = styled.div`
  display: flex;
  justify-content: end;
  width: 70vw;
  height: 9vh;
  border-top: solid 1px #6c6c6c;
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
  cursor: pointer;
  /* border: solid 1px white; */
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
  /* border: solid 1px white; */
  `;

export const InputBoxIpt = styled.input`
  display: flex;
  width: 10vw;
  color: white;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  outline: none;
  /* border: solid 1px white; */
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
  cursor: pointer;
  `;

export const CreateSpaceDesign = styled.div`
  display: flex;
  align-self: center;
  width: 18.5vw;
  height: 4vh;
  /* border: dotted 1px yellow; */
`;

export const CreateBtnDesign = styled.div`
  align-self: center;
  margin-right: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vw;
  height: 4vh;
  background-color: rgba(34, 80, 91, 0.7);
  border-radius: 10px;
  font-size: 0.8vw;
  cursor: pointer;
  img {
    margin-right: 0.5vw;
    height: 50%;
  }
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
color: rgba(193, 193, 193, 0.8);
background-color: transparent;
transition: background-color 0.3s ease;

&:hover {
  font-weight: bold;
  color: white;
}

&.active {
  font-weight: bold;
  color: white;
}
`;