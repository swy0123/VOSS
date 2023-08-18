import { styled } from "styled-components";
import { streamContainerProps } from "./MeetJoin";

export const Container = styled.div`
  /* margin-top: 10%; */
  height: 100%;
  width: 100%;
  background-color: #000000;
`;

export const Header = styled.div`
  position: relative;
  top: 0px;
  width: 100%;
  height: 25px;
  max-height: 10%;
  text-align: center;
  background-color: #222222;
  color: white;
`;

export const HeaderText = styled.span`
  margin-left: 20px;
`;

export const Session = styled.div`
  position: relative;
  width: 98%;
  height: 90%;
  float: left;
`;

// export const Session = styled.div<{ $chatActive: boolean }>`
//   position: relative;
//   ${(props) =>
//     props.$chatActive
//       ? "width: 75%; height: 90%;"
//       : "width: 98%; height: 90%;"};
//   float: left;
// `;

export const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
`;

export const StreamContainer = styled.div<{
  $streamContainerProps: streamContainerProps;
}>`
  /* aspect-ratio: 3/2; */
  margin: auto 5px;
  position: relative;
  max-height: 95%;
  min-height: 48%;
  max-width: 100%;
  /* min-height: 100%; */
  width: ${(props) =>
    props.$streamContainerProps.bottomOn
      ? "15%"
      : // ? "auto"
      props.$streamContainerProps.curCount == 4
      ? 39 + "%"
      : props.$streamContainerProps.curCount > 4
      ? 28 + "%"
      : 100 / props.$streamContainerProps.curCount - 4 + "%"};
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
      ? "position:fixed; right: 0; width: 25%; height: 90%; overflow:hidden;"
      : "width: 0%; height: 0%; overflow:hidden;"};
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
  /* background-color: red; */
  /* overflow: hidden; */
  border-radius: 12px;
  z-index: 10;
`;

//---------------배지 모달------------------
export const ModalHeader = styled.div`
  color: white;
  text-align: center;
`;
export const ModalContainer = styled.div`
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const DialogBox = styled.dialog`
  width: 450px;
  height: 600px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  /* align-items: center; */
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  z-index: 10000;
`;

export const Backdrop = styled.div`
  pointer-events: auto;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ExitImg = styled.img`
  pointer-events: auto;
  position: absolute;
  right: 10px;
  top: 9px;
  width: 20px;
  height: 20px;
`;

export const MeetBadgeDiv = styled.div`
  position: relative;
  display: flex;
  height: 80px;
  width: 80px;
  pointer-events: auto;
`;

export const MeetBadgeImg = styled.img`
  height: 60px;
  width: 60px;
  margin: 0 10px;
  pointer-events: auto;
`;

export const TmpButton = styled.div`
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: transparent;
  padding-bottom: 2px;
  margin: 15px;
  width: 50px;
  height: 30px;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  border-color: white;
  color: white;
  &:hover {
    color: black;
    background-color: white;
  }
`;

export const MeetBadgeHovor = styled.div<{ $hoverActive: number }>`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 100%;
  width: max-content;
  height: auto;
  text-align: center;
  transition: top 1s ease-in;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 20001;
  font-size: 14px;
  color: white;

  ${(props) =>
    props.$hoverActive > 0
      ? "animation-duration: 1s; animation-name: fadeout;"
      : ""}

  @keyframes fadeout {
    0% {
      top: 120%;
      opacity: 0;
    }
    100% {
      opacity: 1;
      top: 100%;
    }
  }
`;
