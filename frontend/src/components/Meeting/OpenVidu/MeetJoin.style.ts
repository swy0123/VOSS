import { styled } from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #202124;
`;

export const Header = styled.div`
  height: 8vh;
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

export const Chat = styled.div`
  width: 100%;
  height: 93%;
  border-radius: 5px;
  background-color: white;
  display: flex;
`;

export const VideoContainer = styled.div`
  margin-top: 20px;
  width: 90%;
  height: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const StreamContainerWrapper = styled.div`
margin: 1%;
  border-radius: 5%;
  display: grid;
  place-items: center;
  grid-gap: 20px;
  height: 100%;
  padding: 10px;
  @media screen and (max-width: 800px) {
    background-color: red;
  }
`;

export const Video = styled.video`
  width: 100%;
  aspect-ratio: 3 / 2;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const StreamContainer = styled.div`
  width: 100%;
  aspect-ratio: 3 / 2;
  margin: 1%;
  border-radius: 5%;
  position: relative;
  min-height: 34vh;
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

export const ChatIconBox = styled.div`
  float: right;
  color: white;
  /* right: 60px;
  top: 50%;
  bottom: 50%; */
  width: 300px;
  height: 600px;
  overflow-y: auto;
`;
export const Session = styled.div`
  float: right;
`;

