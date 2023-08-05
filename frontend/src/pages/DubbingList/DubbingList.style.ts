import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 657px;
`
export const DubbingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1300px;
  margin-left: 20px;
`
export const TitleBox = styled.div`
  display: flex;
  color: white;
  align-items: flex-end;
  margin: 10px 0px 13px 0px;
`
export const MainTitle = styled.h2`
  margin: 0px 20px 0px 0px;
`
export const SubTitle =styled.h4`
  margin: 0px;
`
const OptionButton = styled.button`
  background-color: transparent;
  border: 1px solid #6C6C6C;
  border-radius: 12px;
  padding: 0px 7px 0px 7px;
  margin-right: 10px;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  color:#6C6C6C;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
export const GenreBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 33px;
  margin-bottom: 12px;
`
export const GenreButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#6C6C6C"};
  border: solid ${props => props.$IsClick ? "2px white" : "1px #6C6C6C"};
`
export const VideoBox = styled.div`
  display: flex;
  width: 1300px;
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
  width: 295px;
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
  width: 295px;
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
export const PracticeBtn = styled.button`
  background-color: #353535;
  opacity: 70%;
  border-radius: 20px;
  border: none;
  color: white;
  font-size: 11px;
  width: 70px;
  height: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  
  
`