import { styled } from "styled-components";

// export const OvVidoDiv = styled.div`
//   background-color: red;
// `;

export const VedioOuterDiv = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  margin: 0 auto;
  border-radius: 15px;
`;

export const Video = styled.video`
  width: 120%;
  aspect-ratio: 3 / 2;
  position: relative;
  left: -10%;
`;

export const VedioInnerDiv = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: red;
  /* overflow: hidden; */
  border-radius: 15px;
  z-index: 10;
`;