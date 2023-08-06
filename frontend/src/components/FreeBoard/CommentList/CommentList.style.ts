import { styled } from "styled-components";


export const CommentListDesign = styled.div`
`;

export const CommentInputDesign = styled.textarea`
  resize: none;
  overflow: hidden;
  color: white;
  background-color: transparent;
  padding: 20px;
  width:  calc(70vw - 40px);
  height: 71px;
  border: solid 1px orange;
`;

export const CommentCreateDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 5vw;
  height: 5vh;
  border: solid 1px orange;
`;

export const CommentDesign = styled.div`
  width: 70vw;
  border: solid 1px pink;
`;

export const CommentInfoDesign = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 70vw;
  height: 5vh;
  border: solid 1px pink;
`;

export const CommentUpdateDesign = styled.div`
  margin-left: auto;
  text-align: center;
  line-height: 5vh;
  width: 5vw;
  border: solid 1px pink;
  `;

export const CommentDeleteDesign = styled.div`
  text-align: center;
  line-height: 5vh;
  width: 5vw;
  border: solid 1px pink;
`;

export const CommentContentDiv = styled.div`
  width: 70vw;
  padding: 2vw 0;
  border: solid 1px pink;
`;

export const CommentContentTextArea = styled.textarea`
  color: white;
  background-color: transparent;
  padding: 20px 0;
  width:  70vw;
  border: solid 1px orange;
`;