import React from "react";
import styled, { keyframes } from "styled-components";

const SpinnerContainer = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: rgba(NaN, NaN, NaN, 0);
  position: relative;
`;

const SpinnerAnimation = keyframes`
  0% {
    opacity: 1;
    backface-visibility: hidden;
    transform: translateZ(0) scale(1.3, 1.3);
  } 100% {
    opacity: 0;
    backface-visibility: hidden;
    transform: translateZ(0) scale(1, 1);
  }
`;

const SpinnerDiv = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #708adc;
  position: absolute;
  animation: ${SpinnerAnimation} 2s linear infinite;
`;

const Loading3: React.FC = () => {
  const numDivs = 8;
  const radius = 70; // 반지름
  const center = 100; // 원의 중심 좌표
  const angle = (2 * Math.PI) / numDivs; // 각도

  return (
    <SpinnerContainer>
      <div className="ldio-7oxvdq6cflp">
        {[...Array(numDivs)].map((_, index) => (
          <SpinnerDiv
            key={index}
            style={{
              left: `${center + radius * Math.cos(angle * index)}px`,
              top: `${center + radius * Math.sin(angle * index)}px`,
              animationDelay: `${0.25 * ((index + 1))}s`, // 반짝임 순서에 따라 delay 조정
              // animation 시간 (2s) / 공의 개수 (8) = 0.25s
            }}
          ></SpinnerDiv>
        ))}
      </div>
    </SpinnerContainer>
  );
};

export default Loading3;
