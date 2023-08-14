import styled from "styled-components";

export const RecordContentDesign = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: 20px;
  width: 1005px;
  border: solid 1px green;
`;

export const RecordItemDesign = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 230px;
  height: 330px;
  border: solid 1px green;
`;

export const RecordTitleDesign = styled.div`
  padding: 20px 20px 25px 20px;
  width: 190px;
  height: 70px;
  font-size: 14px;
  border: solid 1px orange;
`;

export const RecordPlayerDesign = styled.div`
  display: flex;
  justify-content: center;
  width: 230px;
  height: 30px;
  border: solid 1px orange;
  cursor: pointer;
  audio {
    width: 200px;
    height: 30px;
    border-radius: 5px;
    background-color: #EFEFEF;
  }
`;

export const RecordSpace1Design = styled.div`
  width: 230px;
  height: 25px;
  border: solid 1px blue;
`;


export const RecordLikeImageDesign = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 25px;
cursor: pointer;
img {
  height: 25px;
  width: 25px;
}
border: solid 1px orange;
`;

export const RecordLikeNumDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  font-size: 11px;
  border: solid 1px orange;
  `;

export const RecordSpace2Design = styled.div`
  width: 230px;
  height: 20px;
  border: solid 1px blue;
  /* cursor: pointer; */
`;

export const RecordDateHitsDesign = styled.div`
display: flex;
padding: 0 10px;
width: 210px;
height: 30px;
font-size: 11px;
line-height: 30px;
border: solid 1px orange;
/* cursor: pointer; */
`;

export const RecordDateDesign = styled.div`
width: 110px;
height: 30px;
border: solid 1px white;
`;

export const RecordHitsDesign = styled.div`
width: 110px;
height: 30px;
text-align: end;
border: solid 1px white;
`;

export const RecordUsersDesign = styled.div`
display: flex;
align-items: center;
padding: 0 10px;
width: 210px;
height: 40px;
border: solid 1px white;
img {
  cursor: pointer;
  height: 30px;
  width: 30px;
}
span {
  cursor: pointer;
  margin-left: 10px;
  text-align: end;
  line-height: 40px;
}
`;