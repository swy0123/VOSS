import { styled, keyframes, css } from "styled-components";

export const ImgDiv = styled.div`
  width: 300px;
  height: 180px;
  margin: 0 auto;
`;
export const Img = styled.img`
  width: 300px;
  height: 180px;
  object-fit: contain;
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;
const moveLeft = keyframes`
    from { left: 50%; }
    to { left: 30%; }
`;

export const Logo = styled.div<{ $isScroll: number }>`
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  /* overflow: hidden; */

  left: ${({ $isScroll }) => ($isScroll >= 1800 ? "30%" : "50%")};
  transition: left 1.2s ease-in-out;
  animation: ${fadeIn} 2.6s ease-in-out;

  /* 
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  animation: ${fadeIn} 2.6s ease-in-out;
  left: ${({ $isScroll }) => ($isScroll >= 1800 ? "30%" : "50%")};
  ${({ $isScroll }) =>
    $isScroll >= 1800
      ? css`
          animation: ${moveLeft} 1.4s ease-in-out;
        `
      : css`
          left: 50%;
        `} 
        */
`;

const moveUp = keyframes`
    from { bottom: -300vh; }
    to { bottom: 0; }
`;

export const ContentDiv = styled.div<{ $isScroll: number }>`
  width: 380px;
  height: 600px;
  text-align: center;
  position: fixed;
  right: 15%;
  bottom: ${({ $isScroll }) => ($isScroll >= 1700 ? "0" : "-300vh")};
  transition: bottom 1s ease-in-out;
`;

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(50%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const TextWhite = styled.div<{ $isScroll: number }>`
  margin: 0 auto;
  color: #ffffff;
  opacity: ${({ $isScroll }) => ($isScroll >= 600 ? 1 : 0)};
  transform: translateY(${({ $isScroll }) => ($isScroll >= 600 ? 0 : "50%")});
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  animation: ${({ $isScroll }) => ($isScroll >= 600 ? fadeInUp : "none")};
`;

export const Catchphrase = styled.div`
  text-align: center;
  font-size: 40px;
  margin-top: 0px;
  margin-bottom: 10px;
  font-weight: bold;
  transform: skew(-9deg);
`;

export const Text = styled.div`
  text-align: center;
  margin-top: 2px;
  font-size: 15px;
  font-weight: 800;
`;
