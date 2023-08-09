import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { postLogin, headerTest, testLogin } from "../../../api/login";
import axios from "axios";
import Eye from "../../../assets/main/eye.png";
import GoogleIcon from "../../../assets/main/googleIcon.png";
import KakaoIcon from "../../../assets/main/kakaoIcon.png";
import NaverIcon from "../../../assets/main/naverIcon.png";
import { useRecoilState } from "recoil";
import { CurrentUserAtom, LoginModeAtom, LoginState } from "../../../recoil/Auth";
import { Button, CheckBox, CheckBoxDiv, Container, Forgot, H2, Icon, Input, InputDiv, InputHeader, LineText, OAuthDiv, P, ShowPswd, Title, UnderText } from "./Login.style";
import { Display } from './../../DubbingRoom/Video/Video.style';

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPswd] = useState<boolean>(false);
  //체크박스는 이후 기본 상태 받아와서 설정
  const [checkbox, setCheckbox] = useState<boolean>(/**/ false);
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom);
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [loginMode, setLoginMode] = useRecoilState(LoginModeAtom);
  const MAX_LENGTH = 50;

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
    console.log("setCheckbox");
  };

  const ShowPassword = () => {
    if (showPswd) setShowPswd(false);
    else setShowPswd(true);
    console.log("setShowPswd");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    const LoginProps: LoginProps = {
      email: email,
      password: password,
    }
    // testLogin();
    // headerTest();
    // postTest(LoginProps);

    const userinfo = await postLogin(LoginProps)
    // 로그인 요청이 성공하면
    if (userinfo) {
      setIsLogin(true) // 로그인 여부 아톰에 저장
      setCurrentUser(userinfo) // 유저 정보 아톰에 저장
      navigate("category")
    }
    else {
      console.log("fail")
      alert("로그인이 실패하였습니다");
    }
  };

  return (
    <Container>
      <Title>
        <P>로그인</P>
        <H2>다시 오신 것을 환영해요!</H2>
      </Title>
      <div>
        <form onSubmit={handleSubmit}>
          <InputDiv>
            <InputHeader>이메일</InputHeader>
            <Input type="email" onChange={handleEmailField} placeholder="이메일을 입력해주세요" />
          </InputDiv>
          <InputDiv>
            <InputHeader>비밀번호</InputHeader>
            <Input
              type={showPswd ? "text" : "password"}
              onChange={handlePasswordField}
              placeholder="비밀번호"
              autoComplete="off"
            />
            <ShowPswd onClick={ShowPassword}>
              <img src={Eye} />
            </ShowPswd>
          </InputDiv>
          <CheckBoxDiv>
            <CheckBox>
              <input type="checkbox" checked={checkbox} onChange={handleCheckboxField} />
              아이디 저장
            </CheckBox>
            <Forgot
              onClick={() => {
                console.log("Forgot");
              }}
              style={{ textDecoration: "none" }}
            >
              비밀번호 찾기
            </Forgot>
          </CheckBoxDiv>
          <Button type="submit">로그인</Button>
        </form>
      </div>

      <OAuthDiv>
        <LineText>간편 로그인</LineText>
        <hr />
        <Icon
          onClick={() => {
            console.log("GoogleIcon");
          }}
        >
          <img src={GoogleIcon} />
        </Icon>
        <Icon
          onClick={() => {
            console.log("NaverIcon");
          }}
        >
          <img src={NaverIcon} />
        </Icon>
        <Icon
          onClick={() => {
            console.log("KakaoIcon");
          }}
        >
          <img src={KakaoIcon} />
        </Icon>
      </OAuthDiv>

      <UnderText>
        <P onClick={() => setLoginMode(false)} style={{ textDecoration: "none",  cursor: "pointer"}}>
          처음 오셨나요? 회원가입
        </P>
      </UnderText>
    </Container>
  );
};

export default Login;
