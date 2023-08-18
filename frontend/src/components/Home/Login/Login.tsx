import React, { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from "react";
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
import {
  Button,
  CheckBox,
  CheckBoxDiv,
  Container,
  Forgot,
  H2,
  Icon,
  Input,
  InputDiv,
  InputHeader,
  LineText,
  OAuthDiv,
  P,
  ShowPswd,
  Title,
  UnderText,
} from "./Login.style";
import { useCookies } from "react-cookie";
import EmailModal from "./EmailModal";
import AlertContext from "/src/context/alert/AlertContext";
import { scrollEventState, scrollUserState } from "/src/recoil/HW_Atom";

interface LoginProps {
  email: string;
  password: string;
}
type Props = {
  HandleIsEnd: () => void;
}

const Login: React.FC<Props> = ({HandleIsEnd}) => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom);
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [loginMode, setLoginMode] = useRecoilState(LoginModeAtom);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const MAX_LENGTH = 50;
  const [scrollEvent, setScrollEvent] = useRecoilState(scrollEventState);
  const [scrollUser, setScrollUser] = useRecoilState(scrollUserState);

  const { alert: alertComp } = useContext(AlertContext);
  const onAlertClick = async (text: string) => {
    const result = await alertComp(text);
    console.log("custom", result);
    // return true;
    HandleIsEnd();
  };

  useEffect(() => {
    if (cookies.rememberEmail !== undefined) {
      setEmail(cookies.rememberEmail);
      setCheckbox(true);
    }
  }, []);

  useEffect(() => {
    if (!checkbox) {
      removeCookie("rememberEmail");
      console.log("removeCookie");
    } else {
      setCookie("rememberEmail", email);
      console.log("setCookie");
    }
    console.log(cookies.rememberEmail);
  }, [checkbox]);

  const handleEmailField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setEmail(e.target.value.split(" ").join(""));
    console.log(checkbox);
    if (checkbox) setCookie("rememberEmail", email);
  };

  const handlePasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setPassword(e.target.value.split(" ").join(""));
  };

  const toggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const handleCheckboxField = () => {
    if (checkbox) setCheckbox(false);
    else setCheckbox(true);
  };

  const ShowPassword = () => {
    if (showPswd) setShowPswd(false);
    else setShowPswd(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      await onAlertClick("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    const LoginProps: LoginProps = {
      email: email,
      password: password,
    };
    // testLogin();
    // headerTest();
    // postTest(LoginProps);

    const userinfo = await postLogin(LoginProps);
    // 로그인 요청이 성공하면
    if (userinfo) {
      setIsLogin(true); // 로그인 여부 아톰에 저장
      setCurrentUser(userinfo); // 유저 정보 아톰에 저장
      navigate("category");
    } else {
      console.log("fail");
      await onAlertClick("로그인이 실패하였습니다");
    }
  };

  return (
    <Container $isScroll={scrollEvent}>
      <Title>
        <P>로그인</P>
        <H2>환영합니다</H2>
      </Title>
      <div>
        <form onSubmit={handleSubmit}>
          <InputDiv>
            <InputHeader>Email</InputHeader>
            <Input
              type="email"
              value={email}
              onChange={handleEmailField}
              placeholder="이메일을 입력해주세요"
            />
          </InputDiv>
          <InputDiv>
            <InputHeader>Password</InputHeader>
            <Input
              type={showPswd ? "text" : "password"}
              value={password}
              onChange={handlePasswordField}
              placeholder="비밀번호를 입력해주세요"
              autoComplete="off"
            />
            <ShowPswd onClick={ShowPassword}>
              <img src={Eye} />
            </ShowPswd>
          </InputDiv>
          <CheckBoxDiv>
            <CheckBox>
              <input
                type="checkbox"
                checked={checkbox}
                onChange={handleCheckboxField}
                style={{
                  cursor: "pointer",
                }}
              />
              아이디 저장
            </CheckBox>
            <Forgot
              onClick={() => {
                toggleModal();
              }}
              style={{ textDecoration: "none" }}
            >
              비밀번호 재발급
            </Forgot>
          </CheckBoxDiv>
          <Button type="submit">로그인</Button>
        </form>
      </div>

      <UnderText>
        <div className="first-text">아직 회원이 아니신가요?</div>
        <div className="second-text" onClick={() => setLoginMode(false)}>
          회원가입
        </div>
      </UnderText>

      {isOpenModal && <EmailModal toggleModal={toggleModal}></EmailModal>}
    </Container>
  );
};

export default Login;
