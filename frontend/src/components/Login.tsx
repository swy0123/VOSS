import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Eye from "../assets/main/eye.png";
import GoogleIcon from "../assets/main/googleIcon.png";
import NaverIcon from "../assets/main/naverIcon.png";
import KakaoIcon from "../assets/main/kakaoIcon.png";
import { postLogin, postTest, testLogin } from "../api/login";
import axios from "axios";

const Container = styled.div`
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

const P = styled.p`
  font-size: 10px;
  font-weight: bold;
`;

const H2 = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 5%;
`;

const Title = styled.div`
position: relative;
  width: 80%;
  height: auto;
  margin: 10% auto;
  margin-bottom: 20%;
  text-align: left;
`;

const UnderText = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
`;

const InputDiv = styled.div`
  position: relative;
`;

const InputHeader = styled.div`
  width: fit-content;
  font-size: 12px;
  color: #757575;
  padding: 8px;
  height: 12px;
  background-color: #ffffff;
  position: absolute;
  top: 2px;
  left: 12%;
`;

const ShowPswd = styled.div`
  position: absolute;
  top: 50%;
  right: 12%;
`

const Input = styled.input`
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

const CheckBoxDiv = styled.div`
  margin: 0 auto;
  position: relative;
  width: 85%;
  height: 40px; 
  font-size: 12px;
`;

const CheckBox = styled.div`
  position: absolute;
  top: 10px;
  left: 0px;
`;
const Forgot = styled.div`
  position: absolute;
  top: 13px;
  right: 0px;
`;

const Button = styled.button`
  background-color: #212121;
  border: #212121;
  font-size: 12px;
  color: #ffffff;
  border-style: solid;
  width: 85%;
  height: 40px;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 0px;
`;

const OAuthDiv = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 12px;
  width: 85%;
`;

const LineText = styled.div`
  width: max-content;
  font-size: 12px;
  color: #757575;
  height: 12px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
`;

const Icon = styled.span`
  margin: 10px;
  position: relative;
  top: 20px;
`;

interface LoginProps {
  email: string,
  password: string
}

type Props = {
  isLoginMode: (flag: boolean) => void;
}

const Login: React.FC<Props> = ({ isLoginMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPswd] = useState<boolean>(false);
  //체크박스는 이후 기본 상태 받아와서 설정
  const [checkbox, setCheckbox] = useState<boolean>(/**/false);
  const MAX_LENGTH = 20;

  const handleEmailField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setEmail(e.target.value);
  };
  const handlePasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setPassword(e.target.value);
  };

  const handleCheckboxField = () => {
    if (checkbox) setCheckbox(false);
    else setCheckbox(true);
    console.log("setCheckbox")
  };

  const ShowPassword = () => {
    if (showPswd) setShowPswd(false);
    else setShowPswd(true);
    console.log("setShowPswd")
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const LoginProps = {
      email: email,
      password: password
    }

    // console.log("test")
    // testLogin();
    // postTest(LoginProps);
    postLogin(LoginProps);

    // let data = JSON.stringify({
    //   "email": "won@naver.com",
    //   "password": "1234"
    // });
    
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'http://wonyoung210.p-e.kr:8080/auth/login',
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };
    
    // axios.request(config)
    // .then((response:any) => {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch((error:any) => {
    //   console.log(error);
    // });

    alert(`${email}\n${password}\n`);
  };

  return (
    <Container>
      <Title>
        <P>WELCOME BACK</P>
        <H2>Log In to your Account</H2>
      </Title>
      <div>
        <form onSubmit={handleSubmit}>
          <InputDiv>
            <InputHeader>Email</InputHeader>
            <Input type="email" onChange={handleEmailField} placeholder="Email" />
          </InputDiv>
          <InputDiv>
            <InputHeader>Password</InputHeader>
            <Input type={showPswd ? "text" : "password"}
              onChange={handlePasswordField}
              placeholder="Password"
            />
            <ShowPswd onClick={ShowPassword}>
              <img src={Eye} />
            </ShowPswd>
          </InputDiv>
          {/* <CheckBoxDiv>
            <CheckBox>
              <input
                type="checkbox"
                checked={checkbox}
                onChange={handleCheckboxField}
              />
              Remember me
            </CheckBox>
            <Forgot onClick={() => { console.log("Forgot") }} style={{ textDecoration: "none" }}>Forgot Password?</Forgot>
          </CheckBoxDiv> */}
          <Button type="submit">CONTINUE</Button>
        </form>
      </div>

      <OAuthDiv>
        <LineText>간편 로그인</LineText>
        <hr />
        <Icon onClick={() => { console.log("GoogleIcon") }}><img src={GoogleIcon} /></Icon>
        <Icon onClick={() => { console.log("NaverIcon") }}><img src={NaverIcon} /></Icon>
        <Icon onClick={() => { console.log("KakaoIcon") }}><img src={KakaoIcon} /></Icon>
      </OAuthDiv>

      <UnderText>
        <P>
          New User? <a onClick={() => isLoginMode(true)} style={{ textDecoration: "none" }}>SIGN UP HERE</a>
        </P>
      </UnderText>
    </Container>
  );
}
export default Login;