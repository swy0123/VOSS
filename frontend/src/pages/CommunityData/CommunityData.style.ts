import styled from "styled-components";


export const DataScrollDesign = styled.div`
  width: 100vw;
  height: calc(100vh - 65px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  /* border: solid 1px red; */
  `;

export const DataMainDesign = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6px auto 0 auto;
  width: 1005px;
  color: white;
  margin-top: 20px;;
  /* border: solid 1px white; */
  `;


export const DataTitleSelectDesign = styled.div`
  display: flex;
  width: 1000px;
  height: 70px;
  /* border: solid 1px red; */
  `;

export const DataTitleDesign = styled.div`
  display: flex;
  padding-right: 70px;
  height: 70px;
  /* border: solid 1px red; */
  h2{
    span{
      cursor: pointer;
      &:hover {
        text-decoration: underline
      }
    }
  };
  `;

export const DataSelectDesign = styled.label`
display: flex;
width: 120px;
height: 70px;
  cursor: pointer;
/* border: solid 1px red; */
input {
    cursor: pointer;
};
div {
  margin-left: 10px;
  font-size: 12px;
  line-height: 70px;
  /* border: solid 1px red; */
};
`;

export const DataContentDesign = styled.div`
  display: flex;
  width: 1000px;
  /* border: solid 1px green; */
  `;

export const CommentListDesign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1000px;
  padding: 10px 5px;
  border-bottom: solid 1px #6c6c6c;
  border-top: solid 1px #6c6c6c;
  &:hover {
    background-color: rgba(1, 1, 1, 0.25);
  }
  `;

export const TitleCommentDesign = styled.div`
  display: flex;
  align-items: center;
  width: 1000px;
  /* border: solid 1px green; */
  `;

export const TitleDesign = styled.div`
display: flex;
align-items: center;
padding-left: 20px;
width: 800px;
height: 30px;
font-size: 13px;
/* border: solid 1px green; */
img {
  height: 20px;
  margin-left: 5px;
}
div {
  margin-left: 10px;
}
`;

export const TitleDateDesign = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 200px;
height: 30px;
font-size: 12px;
/* border: solid 1px green; */
`;