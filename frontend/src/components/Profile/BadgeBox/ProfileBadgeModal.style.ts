import styled from "styled-components";


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
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const DialogBox = styled.dialog`
  width: 450px;
  height: 600px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  /* align-items: center; */
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10000;
`;

export const Backdrop = styled.div`
  pointer-events: auto;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.1);
`;


export const BadgeContent = styled.div`
  width: 100%;
  /* height: 100%; */
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  flex-wrap: wrap;
  /* border: solid 1px red; */
`;


export const MeetBadgeDiv = styled.div`
  position: relative;
  display: flex;
  height: 100px;
  width: 80px;
  pointer-events: auto;
  /* border: solid 1px red; */
`;

export const MeetBadgeImg = styled.img`
  height: 60px;
  width: 60px;
  margin: 0 10px;
  pointer-events: auto;
`;

export const MeetBadgeImg2 = styled.img`
  height: 60px;
  width: 60px;
  margin: 0 10px;
  pointer-events: auto;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
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
  top: 70%;
  width: max-content;
  height: auto;
  text-align: center;
  transition: top 1s ease-in;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 20001;
  font-size: 14px;
  color: white;

  ${(props) => props.$hoverActive > 0
  ? "animation-duration: 1s; animation-name: fadeout;"
  : "animation-duration: 0.5s; animation-name: fadeoutslow;"};

  @keyframes fadeout {
    0% {
      top: 85%;
      opacity: 0;
    }
    100% {
      opacity: 1;
      top: 70%;
    }
  }
`;
