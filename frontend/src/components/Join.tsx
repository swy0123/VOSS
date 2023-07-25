import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Eye from "../assets/main/eye.png";
import { postJoin, postTest } from "../api/join";
import axios from "axios";

const Container = styled.div`
  background-color: #ffffff;
  /* width: 25%;
  height: 75%; */
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


    // 스니펫펫
    // let data = JSON.stringify({
    //   "email": "wy@naver.com",
    //   "password": "1234",
    //   "nickname": "wy"
    // });
    
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'http://wonyoung210.p-e.kr:8080/member',
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };
    
    // axios.request(config)
    // .then((response) => {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

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
