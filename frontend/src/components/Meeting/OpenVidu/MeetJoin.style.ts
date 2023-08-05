import { styled } from "styled-components";

export const Container = styled.div`
  /* margin-top: 10%; */
  height: 100%;
  width: 100%;
  background-color: #202124;
`;

export const Header = styled.div`
  height: 8%;
  display: flex;
  align-items: center;
  padding: 0 50px;
  justify-content: center;
  background-color: #BABABA;
  color: #ffffff;
  opacity: 0.5;
`;

export const StudyTitle = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

export const Middle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

export const Left = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Right = styled.div`
  position: relative;
  padding: 0 20px;
  display: flex;
  align-items: center;
  transition: 0.5s;
  ${(props) =>
    props.primary ? `right:0; flex:1;` : `right:calc(-100vw/3); flex:0;`}
`;


export const VideoContainer = styled.div`
  margin-top: 20px;
  width: 90%;
  height: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;


export const StreamContainer = styled.div`
  height: 100%;
  margin: 1%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

export const Bottom = styled.div`
  height: 13vh;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
`;

export const BottomBox = styled.div`
  display: flex;
  height: 100%;
  width: 20%;
  align-items: center;
  justify-content: space-around;
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #3c4043;
  }
`;

export const ChatBox = styled.div`
  float: left;
  color: white;
  /* right: 60px;
  top: 50%;
  bottom: 50%; */
  width: 25%;
  height: 80%;
  background-color: blue;
  /* position: relative;
  overflow-y: auto; */
`;

export const Session = styled.div`
position: relative;
  width: 75%;
  height: auto;
  float: left;
`;

export const ToolBar = styled.div`
position: relative;
bottom: 0px;
  width: 100%;
`;

