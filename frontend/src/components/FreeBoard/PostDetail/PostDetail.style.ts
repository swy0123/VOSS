import { styled } from "styled-components";

export const DetailScrollDesign = styled.div`
  font-size: 14px;
  margin-top: -15px;
  width: 100vw;
  height: 90vh;
  /* border: solid 2px red; */
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  };
  `;

export const PostDetailDesign = styled.div`
  margin-top: 10vh;
  margin-left: 15vw;
  width: 70vw;
  color: white;
  /* border: solid 1px white; */
  `;

export const DetailTitleUserDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 5vh;
  /* border: solid 2px red; */
  `;

export const DetailTitleDesign = styled.div`
  display: flex;
  align-items: center;
  width: 55vw;
  height: 5vh;
  // <h3> 태그 속성
  font-size: 19px;
  font-weight: bold;
  /* border: solid 2px red; */
  `;

export const DetailUserDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 15vw;
  height: 5vh;
  color: #a4a4a4;
  /* border: solid 2px red; */
  text-decoration: underline;
  `;

export const DetailInfoDateDesign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  height: 6vh;
  border-bottom: solid 1px #dedede;
  `;

export const DetailInfoDesign = styled.div`
  display: flex;
  align-items: center;
  width: 55vw;
  height: 5vh;
  /* border: solid 1px red; */
  `;

export const DetailDateDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 15vw;
  height: 5vh;
  color: #a4a4a4;
  /* border: solid 1px red; */
  `;

export const DetailContentDesign = styled.div`
  padding: 3vw 2vw 8vw 2vw;
  width: 66vw;
  /* border: solid 1px yellow; */
  `;

export const DetailLikeRowDesign = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 5vw;
  height: 4vh;
  border: solid 1px #EFEFEF;
  border-radius: 30px;
  `;

export const DetailLikeNumDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  font-size: 1.5vh;
  /* border: solid 1px green; */
  `;

export const DetailLikeDesign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  /* border: solid 1px green; */
  img {
    height: 2vh;
    width: 2vh;
  }
  `;

export const DetailUpdateDeleteDesign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 70vw;
  height: 9vh;
  border-bottom: solid 1px #dedede;
  `;
export const DetailUpdateDesign = styled.div`
  margin-right: 1vw;
  text-align: center;
  line-height: 3.5vh;
  width: 3.7vw;
  height: 3.5vh;
  font-size: 0.75vw;
  font-weight: bold;
  border-radius: 50px;
  color: black;
  background-color: white;
  border: solid 1px white;
  `;

export const DetailDeleteDesign = styled.div`
  margin-right: 1vw;
  text-align: center;
  line-height: 3.5vh;
  width: 3.7vw;
  height: 3.5vh;
  font-size: 0.75vw;
  font-weight: bold;
  border-radius: 50px;
  color: white;
  background-color: transparent;
  border: solid 1px white;
  `;

export const DetailIndexDesign = styled.div`
  margin-right: 1vw;
  text-align: center;
  line-height: 4vh;
  margin-left: auto;
  width: 5.5vw;
  height: 4vh;
  background-color: rgba(34, 80, 91, 0.7);
  border-radius: 15px;
  font-size: 0.8vw;
`;

export const DetailFilesDesign = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 55vw;
  flex-wrap: wrap;
  /* border: solid 1px green; */
  `;

export const DetailImageFileDesign = styled.div`
  background-color: rgba(255, 255, 255, 0.21);
  padding: 5px 10px;
  margin: 5px;
  /* border: solid 1px yellowgreen; */
  `;

export const DetailOtherFileDesign = styled.div`
  background-color: rgba(255, 255, 255, 0.21);
  border: solid 1px yellowgreen;
  margin: 5px;
`;