import { styled } from "styled-components";


export const FreeBoardDesign = styled.div`
  width: 1000px;
  color: white;
  border-bottom: solid 1px #6c6c6c;
  /* border: dotted 1px yellow; */
  `;


export const PostCategoryDesign = styled.div`
  display: flex;
  width: 1000px;
  height: 46px;
  font-size: 10px;
  /* border-bottom: solid 1px white; */
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
font-size: 12px;
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

export const PostListDesign = styled.div`
  /* border: solid 1px white; */
  display: flex;
  width: 1000px;
  height: 50px;
  font-size: 11px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
  `;

export const PostNumberDesign = styled.div`
  /* border: solid 2px red;  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 8%;
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  `;

export const PostTitleDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 6%;
  width: 44%;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  `;

export const PostFileDesign = styled.img`
  margin-left: 5px;
  width: 15px;
  height: 15px;
`;

export const PostCommentsDesign = styled.div`
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 50%;
  background-color: white;
  color: black;
  width: 20px;
  height: 20px;
  font-size: 12px;
`;

export const PostUserDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  cursor: pointer;
  span {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PostCreatedatDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items : center;
  width: 16%;
`;

export const PostHitDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8%;
`;

export const PostLikeDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8%;
`;