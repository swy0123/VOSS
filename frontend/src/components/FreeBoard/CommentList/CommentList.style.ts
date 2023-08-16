import { styled } from "styled-components";


export const CommentListDesign = styled.div`
`;

export const CommentInputDesign = styled.textarea`
  resize: none;
  overflow: hidden;
  color: white;
  background-color: rgba(1, 1, 1, 0.18);
  padding: 20px;
  width: 960px;
  height: 71px;
  border: none;
  /* border: solid 1px orange; */
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const CommentCreateDesign = styled.div`  
  margin: 10px 10px 0 auto;
  padding: 5px;
  width: 50px;
  text-align: center;
  font-size: 14px;
  border-radius: 10px;
  color: white;
  background-color: transparent;
  border: solid 1px white;
  cursor: pointer;
`;

export const CommentDesign = styled.div`
  margin-top: 10px;
  width: 1000px;
  border-bottom: solid 1px #7d7d7d;
  /* border: solid 1px pink; */
`;

export const CommentInfoDesign = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 1000px;
  height: 35px;
  color: #a4a4a4;
  /* border: solid 1px pink; */
  img {
    cursor: pointer;
    margin-right: 14px; 
    border-radius: 50%;
    width: 27px;
    height: 27px;
  };
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CommentUpdateDesign = styled.div`
  margin-left: auto;
  margin-right: 15px;
  text-align: center;
  font-size: 14px;
  color: white;
  text-decoration: underline;
  cursor: pointer;
  `;

export const CommentDeleteDesign = styled.div`
  margin-right: 15px;
  text-align: center;
  font-size: 14px;
  color: white;
  text-decoration: underline;
  cursor: pointer;
`;


export const CommentContentDiv = styled.div`
  width: 1000px;
  padding: 10px 10px 30px;
  font-size: 15px;
  /* border: solid 1px pink; */
`;

export const EditCommentBox = styled.div`
  display: flex;
  margin-top: 10px;
  background-color: transparent;
  width:  1000px;
  /* border: solid 1px white; */
`;

export const CommentContentTextArea = styled.textarea`
  color: white;
  background-color: transparent;
  padding: 20px;
  width:  865px;
  margin-left: 10px;
  /* border: solid 1px orange; */
`;

export const EditBtn = styled.div`
  background-color: transparent;
  font-weight: bold;
  font-size: 13px;
  text-align: center;
  line-height: 50px;
  width: 70px;
  height: 50px;
  margin: 10px 10px 0 10px;
  border-radius: 5px;
  background-color: #EFEFEF;
  color: #313131;
`;