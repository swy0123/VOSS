import { styled } from "styled-components";

export const VideoBox = styled.div`
  display: flex;
  width: 1260px;
  flex-wrap: wrap;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const VideoItem = styled.div`
  background-color: #131313;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  margin: 0px 30px 25px 0px;
  height: 240px;
  width: 285px;
  cursor: pointer;

  &:hover {
    background-color: #132B31;
  }
`
// export const Thumbnail = styled.iframe`
//   margin-top: 15px;
//   border: none;
//   height: 120px;
//   width: 215px;
// `

export const Thumbnail = styled.img`
  margin: 25px 0px 6px 0px;
  height: 140px;
  width: 285px;
`

export const Infos = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  width: 260px;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 11px;
  margin-left: 15px;
`
export const Count = styled(Info)``
export const Time = styled(Info)``

const Icon = styled.img`
  height: 11px;
  width: 11px;
  margin-right: 5px;
`

export const CountImg = styled(Icon)``
export const TimeImg = styled(Icon)``

export const Description = styled.div`
  font-size: 15px;
  text-align: left;
  height: 50px;
  width: 260px;
  color: white;
`