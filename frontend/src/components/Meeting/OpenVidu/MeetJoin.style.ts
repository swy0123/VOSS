import { styled } from "styled-components";
import { streamContainerProps } from "./MeetJoin";

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
  height: 95%;
  float: left;
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  margin: 5px auto;
`;

export const StreamContainer = styled.div<{ $streamContainerProps: streamContainerProps }>`
  margin: auto 5px;
  position: relative;
  max-height: ${(props) => (props.$streamContainerProps.bottomOn ? "100%" : "47%")};
  /* min-height: 100%; */
  width: ${(props) =>
    props.$streamContainerProps.bottomOn
      ? 16 + "%"
      : // ? "auto"
      props.$streamContainerProps.curCount == 4
      ? 47 + "%"
      : props.$streamContainerProps.curCount > 4
      ? 31 + "%"
      : 100 / props.$streamContainerProps.curCount - 2 + "%"};
  overflow: hidden;
  
  aspect-ratio: 5/3;
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
