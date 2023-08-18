import React from "react";
import styled, { keyframes } from "styled-components";

const rippleAnimation = keyframes`
  0% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    opacity: 0;
  }
`;

const RippleSpinnerContainer = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
`;

const RippleSpinner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

const RippleDiv = styled.div`
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ${rippleAnimation} 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;

  &:nth-child(1) {
    border-color: #5a3faa;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    border-color: #708adc;
    animation-delay: -1.25s;
  }
`;

const Loading1: React.FC = () => {
  return (
    <RippleSpinnerContainer className="loadingio-spinner-ripple-gw99jav9g4">
      <RippleSpinner className="ldio-y2zd49tmnb">
        <RippleDiv></RippleDiv>
        <RippleDiv></RippleDiv>
      </RippleSpinner>
    </RippleSpinnerContainer>
  );
};

export default Loading1;
