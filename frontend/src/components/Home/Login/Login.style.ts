import { styled, keyframes, css } from "styled-components";

const moveUp = keyframes`
    from { bottom: -300vh; }
    to { bottom: 0; }
`;

export const Container = styled.div<{ $isScroll: number }>`
  background-color: #ffffff;
  width: 380px;
  height: 600px;
  border: #bdbdbd;
  border-style: solid;
  border-width: 1px;
  border-radius: 24px 24px 0px 0px;
  text-align: center;
  /* position: fixed;
  right: 15%;
  bottom: ${({ $isScroll }) => ($isScroll >= 1700 ? "0" : "-300vh")};
  ${({ $isScroll }) =>
    $isScroll >= 1700
      ? css`
          animation: ${moveUp} 1.2s ease-in-out;
        `
      : css`
          left: 50%;
        `} */
`;

export const P = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

export const H2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: 5%;
`;

export const Title = styled.div`
  position: relative;
  width: 80%;
  height: auto;
  margin: 10% auto;
  margin-bottom: 20%;
  text-align: left;
`;

export const UnderText = styled.div`
  display: flex;
  position: absolute;
  width: max-content;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, 0);
  font-size: 14px;

  .first-text {
    margin-right: 8px;
    text-decoration: none;
    cursor: default;
  }

  .second-text {
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #7a8091;
    }
  }
`;

export const InputDiv = styled.div`
  position: relative;
`;

export const InputHeader = styled.div`
  width: fit-content;
  font-size: 14px;
  color: #757575;
  padding: 8px;
  height: 12px;
  background-color: #ffffff;
  position: absolute;
  top: 2px;
  left: 12%;
`;

export const ShowPswd = styled.div`
  position: absolute;
  top: 50%;
  right: 12%;
  cursor: pointer;
`;

export const Input = styled.input`
  border: #bdbdbd;
  border-style: solid;
  width: 80%;
  height: 40px;
  padding: 0px;
  padding-left: 5%;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 20px;
`;

export const CheckBoxDiv = styled.div`
  margin: 0 auto;
  position: relative;
  width: 85%;
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const CheckBox = styled.div`
  position: absolute;
  left: 0px;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const Forgot = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

export const Button = styled.button`
  background-color: #212121;
  border: #212121;
  font-size: 14px;
  color: #ffffff;
  border-style: solid;
  width: 85%;
  height: 40px;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 50px;
  cursor: pointer;
`;

export const OAuthDiv = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 40px;
  width: 85%;
`;

export const LineText = styled.div`
  width: max-content;
  font-size: 14px;
  color: #757575;
  height: 12px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
`;

export const Icon = styled.span`
  margin: 10px;
  position: relative;
  top: 20px;
  /* cursor: pointer; */
  cursor: not-allowed;
`;
