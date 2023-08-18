import styled from "styled-components";


export const RecordContentDesign = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: 20px;
  width: 1005px;
  /* border: solid 1px green;  */
  overflow: auto;
  height: calc(98vh - 200px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RecordItemDesign = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 230px;
  height: 330px;
  background-color: rgba(100, 100, 100, 0.1);
  border-radius: 10px;
  /* border: solid 1px green; */
`;

export const RecordDeleteDesign = styled.div`
  margin-left: auto;
  margin-right: 10px;
  margin-top: 10px;
  /* border: solid 1px orange; */
  img {
    cursor: pointer;
    height: 18px;
    width : 18px;
  }
`;

export const RecordTitleDesign = styled.div`
  padding: 15px 25px 25px 25px;
  width: 180px;
  height: 50px;
  font-size: 13px;
  overflow-wrap: break-word;
  /* border: solid 1px orange; */
`;

export const RecordPlayerDesign = styled.div`
  display: flex;
  justify-content: center;
  width: 230px;
  height: 25px;
  /* border: solid 1px orange; */
  audio {
    cursor: pointer;
    width: 190px;
    height: 25px;
    color: red;
  };
  audio::-webkit-media-controls-current-time-display,
  audio::-webkit-media-controls-time-remaining-display {
    display: none;
  };
  audio::-webkit-media-controls-timeline {
    padding: 10px 1px;
  };
  audio::-webkit-media-controls {
    background-color: white;
    border-radius: 5px;
  };
  ::-webkit-media-controls-mute-button{
    margin-right: -5px
  }
`;

export const RecordSpace1Design = styled.div`
  width: 230px;
  height: 40px;
  /* border: solid 1px blue; */
`;

export const RecordLikeImageDesign = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 25px;
cursor: pointer;
img {
  height: 20px;
  width: 20px;
}
/* border: solid 1px orange; */
`;

export const RecordLikeNumDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  font-size: 11px;
  /* border: solid 1px orange; */
  `;

export const RecordSpace2Design = styled.div`
  width: 230px;
  height: 25px;
  /* border: solid 1px blue; */
`;

export const RecordDateHitsDesign = styled.div`
display: flex;
padding: 0 10px;
width: 210px;
height: 30px;
font-size: 10px;
line-height: 30px;
color: rgba(193, 193, 193, 0.9);
border-bottom: solid 1px #6c6c6c;
/* border: solid 1px orange; */
`;

export const RecordDateDesign = styled.div`
width: 110px;
height: 30px;
/* border: solid 1px white; */
`;

export const RecordHitsDesign = styled.div`
width: 110px;
height: 30px;
text-align: end;
/* border: solid 1px white; */
`;

export const RecordUsersDesign = styled.div`
display: flex;
align-items: center;
padding: 0 13px;
width: 210px;
height: 45px;
font-size: 12px;
/* border: solid 1px white; */
img {
  cursor: pointer;
  border-radius: 50%;
  height: 24px;
  width: 24px;
}
span {
  cursor: pointer;
  margin-left: 13px;
  text-align: end;
  line-height: 30px;
  &:hover {
    text-decoration: underline;
  }
}
`;