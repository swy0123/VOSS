import { styled } from "styled-components";

// export const OvVidoDiv = styled.div`
//   background-color: red;
// `;

export const VedioOuterDiv = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  aspect-ratio: 3 / 2;
  border-radius: 12px;
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
  left: 2%;
  top: 0;
  color: white;
  font-size: 10px;
  z-index: 10;
`;