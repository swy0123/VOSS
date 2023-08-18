import { styled } from "styled-components";

export const VideoBox = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;


  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: #535353; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  /* &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상
  }
   */
`

export const VideoItem = styled.div`
  background-color:  rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  margin: 0px 1.6% 1.3% 0px;
  height: 240px;
  width: 280px;
  cursor: pointer;

  @media only screen and (max-width: 10000px) {
    height: 240px;
  }
  @media only screen and (max-width: 2100px) {
    width: 18%
  }
  @media only screen and (max-width: 1600px) {
    width: 23%
  }
  @media only screen and (max-width: 1250px) {
    width: 31%
  }
  @media only screen and (max-width: 860px) {
    width: 47%
  }
  @media only screen and (max-width: 560px) {
    width: 90%
  }
  
  &:hover {
    background-color:  rgba(0, 0, 0, 0.7);
  }
`

export const Thumbnail = styled.img`
  margin: 20px 0px 11px 0px;
  height: 155px;
  width: 100%;
`

export const Infos = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  width: 100%;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 12px;
  margin-right: 5%;
`
export const Count = styled(Info)``
export const Time = styled(Info)``

const Icon = styled.img`
  height: 12px;
  width: 12px;
  margin-right: 6px;
`

export const CountImg = styled(Icon)``
export const TimeImg = styled(Icon)``

export const Description = styled.div`
  font-size: 16px;
  text-align: left;
  color: white;
  height: 50px;
  width: 100%;
  margin-left: 12%;
`