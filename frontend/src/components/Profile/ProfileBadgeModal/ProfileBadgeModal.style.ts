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

export const MeetBadgeHovor = styled.div<{ $hoverActive: number }>`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 100%;
  width: max-content;
  height: auto;
  text-align: center;
  transition: top 2s ease-in;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 20001;
  font-size: 14px;
  color: white;


  ${(props) =>
    props.$hoverActive > 0
      ? "animation-duration: 2s; animation-name: fadeout;"
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
