import { styled, keyframes, css  } from "styled-components";

const moveUp = keyframes`
    from { bottom: -300vh; }
    to { bottom: 0; }
`;

export const Container = styled.div<{ $isScroll:number }>`
  background-color: #ffffff;
  /* width: 25%;
  height: 75%; */
  width: 380px;
  height: 600px;
  border: #bdbdbd;
  border-style: solid;
  border-width: 1px;
  border-radius: 24px 24px 0px 0px;
  position: fixed;

  .avatar-bar {
    text-align: left;
  }
  
  /* position: fixed;
  right: 15%;
  text-align: center;

  bottom: ${({ $isScroll }) => ($isScroll >= 1700 ? "0" : "-300vh")};
  ${({ $isScroll }) =>
  $isScroll >= 1700
    ? css `
        animation: ${moveUp} 1.4s ease-in-out;
    `
    : css `
        left: 50%;
    `}

  .avatar-bar {
    text-align: left;
  } */
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
  margin-bottom: 6%;
  text-align: left;
`;

export const ModifyButton = styled.div`
  border: none;
  position: absolute;
  cursor: pointer;
  bottom: 0;
  left: 4rem;
  background: #aaa;
  border: none;
  border-radius: 50px;
  font-size: 12px;
  height: 22px;
  width: 22px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const ModifyImg = styled.img`
  width: 15px;
  height: 15px;
  margin: auto;
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

export const Img = styled.img`
  width: 16px;
`;

export const ShowIcon = styled.div`
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translate(-50%, 0%);
  right: 10%;
`;
export const CheckDiv = styled.div<{ $isEmailChecked: boolean; $isChecked?: boolean }>`
  cursor: pointer;
  transform: translate(50%, -10%);
  width: 34px;
  height: 24px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
  background-color: ${(props) => (props.$isEmailChecked ? "#4CAF50;" : "#444444;")};
  &:hover {
    opacity: ${(props) => (props.$isEmailChecked ? "" : "0.7")};
    /* background-color: ${(props) => (props.$isEmailChecked ? "#4CAF50;" : "#444444;")}; */
    background-color: ${(props) =>
      props.$isEmailChecked ? "#4CAF50;" : props.$isChecked ? "#444444;" : "#DD0013;"};
  }
`;

export const Input = styled.input<{ $isChecked: boolean }>`
  outline: none;
  border-style: solid;
  border-color: black;
  width: 80%;
  height: 40px;
  padding: 0px;
  padding-left: 5%;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 20px;
  &:focus {
    border-width: 1px;
    border-color: ${(props) => (props.$isChecked ? "black" : "#DD0013")};
    height: 40px;
  }
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
  margin-top: 20px;
  cursor: pointer;
`;

export const BlockedButton = styled.button`
  background-color: #666666;
  border: #666666;
  font-size: 14px;
  color: #cccccc;
  border-style: solid;
  width: 85%;
  height: 40px;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 20px;
  cursor: not-allowed;
`;

export const Timer = styled.h1`
  font-size: 17px;
  color: #212121;
  width: 85%;
  height: 40px;
  border-width: 1px;
  border-radius: 8px;
  margin: auto;
  margin-top: 10px;
`;

// export const CheckMsg = styled.div`
//   font-size: 12px;
//   color: #757575;
// `
