import { styled } from "styled-components";

export const Container = styled.div`
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
  bottom: 0px;
  right: 15%;
  text-align: center;

  .avatar-bar {
    text-align: left;
  }
`;

export const P = styled.p`
  font-size: 12px;
  font-weight: bold;
`;

export const H2 = styled.h2`
  font-size: 22px;
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
  position: absolute;
  bottom: 0;
  left: 4rem;
  background: grey;
  border: none;
  border-radius: 5px;
  font-size: 12px;
`;

export const UnderText = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 12%;
font-size: 14px;
/* position: relative;
top: 0; */

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
  top: 50%;
  transform: translate(-50%, 0%);
  right: 10%;
`;
export const CheckDiv = styled.div<{ $isEmailChecked: boolean }>`
  transform: translate(50%, -10%);
  width: 30px;
  height: 20px;
  border-radius: 8px;
  border-style: solid;
  display: flex;
  justify-content:center;
  align-items: center;
  color: white;
  border-color: ${(props) => (props.$isEmailChecked ? "#4CAF50;" : "#444444;")};
  font-size: 12px;
  background-color: ${(props) => (props.$isEmailChecked ? "#4CAF50;" : "#444444;")};
  &:hover{
    opacity: 0.7;
    border-color: ${(props) => (props.$isEmailChecked ? "#4CAF50;" : "#444444;")};
  }
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
