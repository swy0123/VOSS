import { styled } from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  width: 380px;
  height: 600px;
  border: #bdbdbd;
  border-style: solid;
  border-width: 1px;
  border-radius: 24px 24px 0px 0px;
  text-align: center;
  position: fixed;
  bottom: 0px;
  right: 15%;
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
  margin-bottom: 20%;
  text-align: left;
`;

export const UnderText = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 30%;
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
`

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
`;

export const CheckBox = styled.div`
  position: absolute;
  top: 10px;
  left: 0px;
`;
export const Forgot = styled.div`
  position: absolute;
  top: 13px;
  right: 0px;
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
  margin-top: 0px;
`;

export const OAuthDiv = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 12px;
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
`;
