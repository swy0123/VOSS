import { styled } from "styled-components";

// export const OvVidoDiv = styled.div`
//   background-color: red;
// `;

export const VedioOuterDiv = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 3 / 2;
  background-color: blue;
  overflow: hidden;
  border-radius: 15px;
`;

export const VedioInnerDiv = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: red;
  overflow: hidden;
  border-radius: 15px;
  z-index: 10;
`;

export const Video = styled.video`
  width: 120%;
  aspect-ratio: 3 / 2;
  position: relative;
  left: -10%;
`;
