import { styled } from "styled-components";

// export const OvVidoDiv = styled.div`
//   background-color: red;
// `;

export const VedioOuterDiv = styled.div`
  position: relative;
  overflow: hidden;
  font-size: 20px;
  aspect-ratio: 3 / 2;
  border-radius: 12px;
  border: 1px solid #333;
  margin: 10px;

  &:hover {
    background-color: transparent;
    opacity: 0.5;
  }
`;

export const Video = styled.video`
  width: 120%;
  height: 120%;
  position: relative;
  left: -10%;
  top: -10%;
`;

export const VedioInnerDiv = styled.div`
  position: absolute;
  left: 4%;
  top: 2%;
  color: white;
  font-size: 14px;
  /* font-size: 5%; */
  /* z-index: 3; */
`;

export const VedioMuteIcon = styled.img`
  position: absolute;
  right: 2%;
  bottom: 3%;
  color: white;
  width: 10%;
  /* height: 10%; */
  /* z-index: 3; */
`;
export const VedioHoverMenu = styled.div`
  position: absolute;
  width: 40%;
  height: 16%;
  color: white;
  border-radius: 20px;
  background-color: black;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  opacity: 0.8;
  font-size: 7%;
  cursor: pointer;
  z-index: 3;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: gray;
    opacity: 0.9;
  }
`;

export const ProfileImg = styled.div`
  width: 120%;
  height: 120%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  left: -10%;
  top: -10%;
  color: white;
  background-color: #222222;

  img {
    border-radius: 100rem;
    width: 20%;
    object-fit: cover;
  }
`;
