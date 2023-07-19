import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  background-color: #ffffff;
  width: 25%;
  height: 75%;
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
  font-size: 12px;
  font-weight: bold;
`;

const H2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.div`
position: relative;
  width: 80%;
  height: auto;
  margin: 30px auto;
  margin-bottom: 20%;
  text-align: left;
`;

const UnderText = styled.div`
  width: auto;
  height: auto;
  margin: 0 auto;
  margin-top: 20%;
`;

const InputDiv = styled.div`
  position: relative;
`;

const InputHeader = styled.div`
  width: fit-content;
  font-size: 12px;
  color: #757575;
  padding: 5px;
  height: 12px;
  background-color: #ffffff;
  position: absolute;
  top: 2px;
  left: 12%;
`;

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
  margin-top: 20px;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPswd] = useState<boolean>(false);

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
          <Input type={showPswd ? "text" : "password"}
            onChange={handlePasswordField}
            placeholder="Password"
          />
          
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
