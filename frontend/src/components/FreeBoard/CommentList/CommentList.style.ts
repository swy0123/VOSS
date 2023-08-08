import { styled } from "styled-components";


export const CommentListDesign = styled.div`
`;

export const CommentInputDesign = styled.textarea`
  resize: none;
  overflow: hidden;
  color: white;
  background-color: #313131;
  padding: 20px;
  width: calc(70vw - 40px);
  height: 71px;
  border: none;
  /* border: solid 1px orange; */
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const CommentCreateDesign = styled.div`  
  margin-top: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 4vw;
  height: 4vh;
  border: solid 1px white;
  border-radius: 10px;
`;

export const CommentDesign = styled.div`
  margin-top: 1vh;
  width: 70vw;
  border-bottom: solid 1px #7d7d7d;
  /* border: solid 1px pink; */

`;

export const CommentInfoDesign = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 70vw;
  height: 5vh;
  color: #a4a4a4;
  /* border: solid 1px pink; */
`;

export const CommentUpdateDesign = styled.div`
  margin-left: auto;
  margin-right: 0.5vw;
  text-align: center;
  line-height: 3vh;
  width: 3.7vw;
  height: 3vh;
  font-size: 0.75vw;
  color: black;
  background-color: white;
  border-radius: 50px;
  border: solid 1px white;
  `;

export const CommentDeleteDesign = styled.div`
  text-align: center;
  line-height: 3vh;
  width: 3.7vw;
  height: 3vh;
  font-size: 0.75vw;
  color: white;
  background-color: transparent;
  border-radius: 50px;
  border: solid 1px white;
`;


export const CommentContentDiv = styled.div`
  width: 70vw;
  padding: 0.7vw 0 2vw 1vw;
  /* border: solid 1px pink; */
`;

export const CommentContentTextArea = styled.textarea`
  color: white;
  background-color: transparent;
  padding: 20px 0;
  width:  70vw;
  /* border: solid 1px orange; */
`;