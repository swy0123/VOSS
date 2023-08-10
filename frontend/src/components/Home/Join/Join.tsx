import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Eye from "../../../assets/main/eye.png";
import Checked from "../../../assets/main/Checked.png";
import Email from "../../../assets/main/Email.png";
import { authEmail, postJoin, postTest } from "../../../api/join";
import { useRecoilState } from "recoil";
import { LoginModeAtom } from "../../../recoil/Auth";
import EmailModal from "./EmailModal";
import ImageModifyModal from "./ImageModifyModal";
import {
  Button,
  Container,
  H2,
  Input,
  InputDiv,
  InputHeader,
  P,
  ShowIcon,
  Img,
  Title,
  UnderText,
  BlockedButton,
  ModifyButton,
  CheckDiv,
  // CheckMsg,
} from "./Join.style";

const Login = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isPwdChecked, setPwdCheck] = useState<boolean>(false);
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useRecoilState(LoginModeAtom);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isEmailChecked, setEmailChecked] = useState<boolean>(false);
  const [isButtonActive, setButtonActive] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [config, setConfig] = useState({sex: "man", faceColor: "#ffe6c8", earSize: "big", hairColor:"#54216f", hairStyle: "normal", hatColor: "#ff1919", hatStyle: "none", eyeStyle: "circle", glassesStyle: "none", noseStyle: "short", mouthStyle: "peace", shirtStyle: "shrot", shirtColor: "#2a2348", bgColor: "#a3defb" });

  useEffect(() => {
    password.length > 3 && repassword === password ? setPwdCheck(true) : setPwdCheck(false);

    if (nickName.trim().length && isEmailChecked && isPwdChecked && nickName.length > 3) {
      setButtonActive(true);
    } else setButtonActive(false);
  }, [nickName.trim().length, isEmailChecked, repassword, password, nickName]);

  const MAX_LENGTH = 50;

  const handleModifyClick = () => {
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  const handleImageConfig = (updatedConfig: string) => {
    setConfig(updatedConfig);
    closeModal();
  };

  const handleUsernameField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setNickName(e.target.value);
  };

  const handleEmailField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setEmail(e.target.value);
    setEmailChecked(false);
  };

  const handlePasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setPassword(e.target.value);
  };

  const handleRepasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setRepassword(e.target.value);
  };

  const ShowPassword = () => {
    if (showPswd) setShowPswd(false);
    else setShowPswd(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // nickName 이 비어있으면 알람
    if (!nickName.trim().length) {
      alert("유저네임이 비어있습니다");
    } else if (!isEmailChecked) {
      alert("이메일을 인증해주세요");
    } else if (!isPwdChecked) {
      alert("비밀번호를 확인해주세요");
    } else {
      const JoinProps = {
        email: email,
        password: password,
        nickname: nickName,
      };

      const joininfo = postJoin(JoinProps);
      joininfo.then((res) => {
        // 회원가입 성공
        if (res.isJoinSuccess) {
          setLoginMode(true);
          alert(`${JoinProps.nickname}님, 회원 가입을 축하합니다!`);
        }
        // 회원가입 실패
        else {
          alert("회원가입 정보가 잘못되었습니다");
        }
      });
    }
  };

  const onClickModal = async () => {
    const emailCheck = await authEmail(email);
    if (emailCheck) toggleModal();
    else alert("중복된 이메일입니다");
  };

  const toggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const isEmailCheckd = () => {
    setEmailChecked(true);
    console.log("setEmailChecked : true");
  };

  return (
    <Container>
      <Title>
        <P>회원 가입</P>
        <H2>VOSS에 오신 것을 환영합니다!</H2>
      </Title>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "3%" }}>
        <div style={{ position: "relative" }}>
          <Avatar
            className="avatar-bar"
            id="myAvatar"
            style={{ width: "5rem", height: "5rem" }}
            {...config}
          />
          <ModifyButton onClick={handleModifyClick}>수정</ModifyButton>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <InputDiv>
          <InputHeader>이메일</InputHeader>
          <Input type="email" onChange={handleEmailField} placeholder="이메일 인증을 해주세요" />
          <ShowIcon>
            {isEmailChecked ? (
              <CheckDiv $isEmailChecked={isEmailChecked}>완료</CheckDiv>
            ) : (
              <CheckDiv onClick={onClickModal} $isEmailChecked={isEmailChecked}>
                인증
              </CheckDiv>
            )}
          </ShowIcon>
        </InputDiv>
        <InputDiv>
          <InputHeader>비밀번호</InputHeader>
          <Input
            type={showPswd ? "text" : "password"}
            onChange={handlePasswordField}
            placeholder="비밀번호를 4글자 이상 입력해주세요"
          />
          <ShowIcon onClick={ShowPassword}>
            <Img src={Eye} />
          </ShowIcon>
        </InputDiv>
        <InputDiv>
          <InputHeader>비밀번호 확인</InputHeader>
          <Input
            type="password"
            onChange={handleRepasswordField}
            placeholder="비밀번호를 확인해주세요"
          />
          <ShowIcon>{isPwdChecked ? <Img src={Checked} /> : <></>}</ShowIcon>
          {/* {password.length < 4 ? (
            <CheckMsg>비밀번호를 4글자 이상 입력해주세요</CheckMsg>
          ) : (
            <>{!isPwdChecked ? <CheckMsg>비밀번호를 확인해주세요</CheckMsg> : <></>}</>
          )} */}
        </InputDiv>
        <InputDiv>
          <InputHeader>닉네임</InputHeader>
          <Input
            type="text"
            onChange={handleUsernameField}
            placeholder="닉네임을 4글자 이상 입력해주세요"
          />
        </InputDiv>
        {isButtonActive ? (
          <Button type="submit">회원가입</Button>
        ) : (
          <BlockedButton type="submit" disabled>
            회원가입
          </BlockedButton>
        )}
      </form>

      <UnderText>
        <P onClick={() => setLoginMode(true)} style={{ textDecoration: "none" }}>
          이미 회원이신가요? 로그인 하기
        </P>
      </UnderText>

      {isOpenModal && (
        <EmailModal
          toggleModal={toggleModal}
          email={email}
          isEmailCheckd={isEmailCheckd}
        ></EmailModal>
      )}

      {isImageModalOpen && (
        <ImageModifyModal handleConfigUpdate={handleImageConfig} />
      )}
    </Container>
  );
};

export default Login;
