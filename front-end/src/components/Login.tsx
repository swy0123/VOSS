import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  background-color: #ffffff;
  width: 460px;
  height: 768px;
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
  font-size: 12.8px;
  font-weight: bold;
`;

const H2 = styled.h2`
  font-size: 25px;
  font-weight: bold;
`;

const Title = styled.div`
  width: 380px;
  height: auto;
  margin: 40px auto;
  margin-bottom: 100px;
  text-align: left;
`;

const UnderText = styled.div`
  width: 380px;
  height: auto;
  margin: 0 auto;
  margin-top: 200px;
`;

const InputDiv = styled.div`
  position: relative;
`;

const InputHeader = styled.div`
  width: fit-content;
  padding: 5px;
  height: 22;
  background-color: #ffffff;
  position: absolute;
  top: 5px;
  left: 15%;
`;

const Input = styled.input`
  border: #bdbdbd;
  border-style: solid;
  width: 380px;
  height: 56px;
  padding: 0px;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 25px;
`;

const Button = styled.button`
  background-color: #212121;
  border: #212121;
  font-size: 12.8px;
  color: #ffffff;
  border-style: solid;
  width: 380px;
  height: 56px;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 25px;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameField = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailField = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <Input type="password" onChange={handlePasswordField} placeholder="Password" />
        </InputDiv>

        <Button type="submit">GET STARTED</Button>
      </form>

      <UnderText>
        <P>
          Already have an account? <Link to={"/about"}>LOGIN HERE</Link>
        </P>
      </UnderText>
    </Container>
  );
}
export default Login;
