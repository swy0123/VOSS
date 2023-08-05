import { styled } from "styled-components";

export const Container = styled.div`
  /* margin-top: 10%; */
  height: 100%;
  width: 100%;
  background-color: #202124;
`;

export const Header = styled.div`
  position: relative;
  top: 0px;
  width: 100%;
  z-index: 10;
  background-color: gray;
  columns: red;
  height: 2%;
`;

export const Session = styled.div`
  position: relative;
  width: 75%;
  height: auto;
  float: left;
`;

export const VideoContainer = styled.div`
  width: 90%;
  height: auto;
  overflow: hidden;
  /* display: flex; */
  justify-content: center;
  margin: 0 auto;
`;

export const StreamContainer = styled.div<{ $curCount: number }>`
  margin: 1%;
  position: relative;
  width: ${(props) => (props.$curCount < 1 ? "100%" : props.$curCount < 3 ? "48%" : "31%")};
  overflow:hidden;
  box-sizing: border-box;
  float: left;
`;

export const ChatBox = styled.div`
  float: left;
  color: white;
  width: 25%;
  height: auto;
  background-color: blue;
`;

export const ToolBar = styled.div`
  position: relative;
  bottom: 0px;
  width: 100%;
`;
