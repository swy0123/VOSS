import React, { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  background-color: #ffffff;
  width: 300px;
  height: 400px;
  border: #000000;
  border-style: solid;
  border-radius: 20px;
`;

const Input = styled.input`
  border: #ffffff;
  border: #000000;
  border-style: solid;
  width: 80px;
  height: 20px;
  border-width: 1px;
  border-radius: 10%;
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
      <p>LET'S GET YOU STARTED</p>
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <div>Username</div>
          <Input type="text" onChange={handleUsernameField} placeholder="Username" />
        </div>
        <div>
          <div>Email</div>
          <Input type="text" onChange={handleEmailField} placeholder="Email" />
        </div>
        <div>
          <div>Password</div>
          <Input type="text" onChange={handlePasswordField} placeholder="Password" />
        </div>

        <button type="submit">submit</button>
      </form>
    </Container>
  );
}
export default Login;
