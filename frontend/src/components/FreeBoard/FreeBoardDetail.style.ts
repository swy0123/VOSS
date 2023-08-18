import styled from "styled-components";


export const FreeScrollDesign = styled.div`
  width: 100vw;
  height: calc(100vh - 65px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  /* border: solid 1px red; */
  `;

export const FreeMainDesign = styled.div`
  margin: 6px auto 0 auto;
  width: 1000px;
  color: white;
  /* border: solid 1px white; */
  `;

export const FreeTitleUserDesign = styled.div`
  display: flex;
  width: 1000px;
  height: 50px;
  /* border: solid 1px red; */
  `;

export const FreeTitleDesign = styled.div`
  display: flex;
  align-items: center;
  width: 850px;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  /* border: solid 1px red; */
  `;

export const FreeTitleInputDesign = styled.input`
  display: flex;
  align-items: center;
  width: 850px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: transparent;
  border: none;
  /* border: solid 1px red; */
  `;

export const FreeUserDesign = styled.div`
display: flex;
justify-content: end;
align-items: center;
margin-right: 10px;
width: 150px;
height: 60px;
text-decoration: underline;
color: #a4a4a4;
span {
  color: #a4a4a4;
  cursor: pointer;
  &:hover{
    font-weight: bold;
  }
}
/* border: solid 1px red; */
`;

export const FreeInfoDateDesign = styled.div`
  display: flex;
  width: 1000px;
  height: 60px;
  border-bottom: solid 1px #dedede;
  `;

export const FreeInfoDesign = styled.div`
  display: flex;
  align-items: center;
  width: 850px;
  height: 50px;
  /* border: solid 1px red; */
  `;

export const FreeDateDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 150px;
  height: 50px;
  color: #a4a4a4;
  /* border: solid 1px red; */
  `;

export const FreeContentDesign = styled.div`
  /* border: solid 1px yellow; */
  padding: 70px 30px 180px 30px;
  width: 960px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  };
  img {
    max-width: 500px;
    width: 100%,
  }
  `;

export const FreeContentTextAreaDesign = styled.textarea`
padding: 50px 30px 20px 30px;
width: 960px;
height: 130px;
color: white;
font-size: 15px;
line-height: 30px;
background-color: transparent;
border: none;
/* border: solid 1px yellow; */
`;

export const FreeLikeNumDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  font-size: 13px;
  /* border: solid 1px green; */
  `;

export const FreeLikeImageDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  img {
    height: 30px;
    width: 30px;
  }
  /* border: solid 1px green; */
  `;

export const FreeFilesDesign = styled.div`
  margin-left: 40px;
  margin-right: auto;
  display: flex;
  align-items: center;
  width: 700px;
  font-size: 14px;
  flex-wrap: wrap;
  /* border: solid 1px white; */
  `;

export const FreeFileDesign = styled.div`
  /* border: solid 1px red; */
  background-color: rgba(255, 255, 255, 0.21); 
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
`;

export const FreepUdateDeleteDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 1000px;
  height: 70px;
  font-size: 13px;
  border-bottom: solid 1px #dedede;
`;

export const FreeUploadDesign = styled.div`
  padding: 6px 8px;
  margin-right: auto;
  margin-left: 40px;
  border: solid 1px white;
  font-size: 14px;
  cursor: pointer;
  label {
    width: 100%;
    height: 100%;
  }
`;

export const FreeUpdateDesign = styled.div`
  padding: 5px 8px;
  margin-right: 15px;
  width: 55px;
  text-align: center;
  font-weight: bold;
  border-radius: 50px;
  color: black;
  background-color: white;
  border: solid 1px white;
  cursor: pointer;
  `;

export const FreeDeleteDesign = styled.div`
  padding: 5px 8px;
  margin-right: 10px;
  width: 55px;
  text-align: center;
  font-weight: bold;
  border-radius: 50px;
  color: white;
  background-color: transparent;
  border: solid 1px white;
  cursor: pointer;
  `;

export const FreedIexDesign = styled.div`
  padding: 8px 2px; 
  margin-right: 10px;
  margin-left: auto;
  width: 90px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(34, 80, 91, 0.7);
  border-radius: 15px;
  cursor: pointer;
`;