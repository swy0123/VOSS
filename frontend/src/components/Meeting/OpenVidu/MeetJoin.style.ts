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

export const Session = styled.div<{ $chatActive: boolean }>`
  position: relative;
  ${(props) =>
    props.$chatActive
      ? "width: 75%; height: 95%;"
      : "width: 98%; height: 95%;"};
  float: left;
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
  overflow: hidden;
`;

export const StreamContainer = styled.div<{
  $streamContainerProps: streamContainerProps;
}>`
  aspect-ratio: 3/2;
  margin: auto 5px;
  position: relative;
  max-height: 100%;
  max-width: 100%;
  /* min-height: 100%; */
  width: ${(props) =>
    props.$streamContainerProps.bottomOn
      ? props.$streamContainerProps.curCount < 3
        ? "30%"
        : 100 / props.$streamContainerProps.curCount - 2 + "%"
      : // ? "auto"
      props.$streamContainerProps.curCount == 4
      ? 39 + "%"
      : props.$streamContainerProps.curCount > 4
      ? 30 + "%"
      : 100 / props.$streamContainerProps.curCount - 3 + "%"};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

export const ChatBox = styled.div<{ $chatActive: boolean }>`
  float: left;
  color: white;
  ${(props) =>
    props.$chatActive
      ? "width: 25%; height: 95%;"
      : "width: 0%; height: 0%; overflow:hidden;"};
  background-color: blue;
`;

export const ToolBar = styled.div`
  position: relative;
  bottom: 0px;
  width: 100%;
`;

export const VedioInnerDiv = styled.div`
  position: absolute;
  height: 2%;
  width: 2%;
  top: 20px;
  left: 20px;
  background-color: red;
  /* overflow: hidden; */
  border-radius: 12px;
  z-index: 10;
`;
