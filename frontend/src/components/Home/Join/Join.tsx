import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Eye from "../../../assets/main/eye.png";
import { postJoin, postTest } from "../../../api/join";
import axios from "axios";
import { Button, Container, H2, Input, InputDiv, InputHeader, P, ShowPswd, Title, UnderText } from "./Join.style";

type Props = {
  isLoginMode: (flag: boolean) =>void;
}

const Login:React.FC<Props> = ({isLoginMode}) =>{
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const MAX_LENGTH = 20;

  const handleUsernameField = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setUsername(e.target.value);
  };
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

  const ShowPassword = () => {
    if (showPswd) setShowPswd(false);
    else setShowPswd(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const JoinProps = {
      email:email,
      password:password,
      nickname:username
    }
    postJoin(JoinProps);

    //테스트
    // postTest(JoinProps);

    alert(`${username}\n${email}\n${password}\n`);
  };

  return (
    <Container>
      <Title>
        <P>LET'S GET YOU STARTED</P>
        <H2>Create an Account</H2>
      </Title>

      <form onSubmit={handleSubmit}>
        <InputDiv>
          <InputHeader>Username</InputHeader>
          <Input type="text" onChange={handleUsernameField} placeholder="Username" />
        </InputDiv>
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

        <Button type="submit">GET STARTED</Button>
      </form>

      <UnderText>
        <P>
          Already have an account? <a onClick={() => isLoginMode(false)} style={{ textDecoration: "none" }}>LOGIN HERE</a>
        </P>
      </UnderText>
    </Container>
  );
}
export default Login;
