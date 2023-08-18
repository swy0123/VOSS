import React from "react";
import styled, { keyframes } from "styled-components";

const ellipsisAnimation = keyframes`
  0% { transform: translate(12px,80px) scale(0); }
  25% { transform: translate(12px,80px) scale(0); }
  50% { transform: translate(12px,80px) scale(1); }
  75% { transform: translate(80px,80px) scale(1); }
  100% { transform: translate(148px,80px) scale(1); }
`;

const rippleRAnimation = keyframes`
  0% { transform: translate(148px,80px) scale(1); }
  100% { transform: translate(148px,80px) scale(0); }
`;

const colorAnimation = keyframes`
  0% { background: #e15b64 }
  25% { background: #abbd81 }
  50% { background: #f8b26a }
  75% { background: #f47e60 }
  100% { background: #e15b64 }
`;

const EllipsisSpinnerContainer = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
`;

const EllipsisSpinner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

const EllipsisDiv = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transform: translate(80px, 80px) scale(1);
  background: #e15b64;
  animation: ${ellipsisAnimation} 2.5s infinite cubic-bezier(0, 0.5, 0.5, 1);

  &:nth-child(1) {
    background: #f47e60;
    transform: translate(148px, 80px) scale(1);
    animation: ${rippleRAnimation} 0.625s infinite cubic-bezier(0, 0.5, 0.5, 1),
      ${colorAnimation} 2.5s infinite step-start;
  }

  &:nth-child(2) {
    animation-delay: -0.625s;
    background: #e15b64;
  }

  &:nth-child(3) {
    animation-delay: -1.25s;
    background: #f47e60;
  }

  &:nth-child(4) {
    animation-delay: -1.875s;
    background: #f8b26a;
  }

  &:nth-child(5) {
    animation-delay: -2.5s;
    background: #abbd81;
  }
`;

const Loading2: React.FC = () => {
  return (
    <EllipsisSpinnerContainer className="loadingio-spinner-ellipsis-8z6osmxsmrt">
      <EllipsisSpinner className="ldio-l7pcmse0a0d">
        <EllipsisDiv></EllipsisDiv>
        <EllipsisDiv></EllipsisDiv>
        <EllipsisDiv></EllipsisDiv>
        <EllipsisDiv></EllipsisDiv>
        <EllipsisDiv></EllipsisDiv>
      </EllipsisSpinner>
    </EllipsisSpinnerContainer>
  );
};

export default Loading2;
