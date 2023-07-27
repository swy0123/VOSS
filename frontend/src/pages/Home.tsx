import React, { useState } from "react";
import { styled } from "styled-components";
import Login from "../components/Home/Login/Login";
import Join from "../components/Home/Join/Join";
import MainImg from "../assets/main/MainImg.jpg";
import HomeContent from "../components/Home/HomeContent/HomeContent"
import Messenger from "../components/Message/Messenger";

const Mainimg = styled.div`
  background-image: url("${MainImg}");
  background-repeat: no-repeat;
  background-position: 10% 60%;
  background-size: cover;
  height: 100vh;
`;

function Home() {
  const [loginMode, setLoginMode] = useState(true);

  const isLoginMode = (flag:boolean) => {
    console.log(flag);
    setLoginMode(!flag);
  }

  return (
    <Mainimg>
      <div>
        <HomeContent></HomeContent>
        {loginMode ? 
        <Login isLoginMode = {isLoginMode} /> : 
        <Join isLoginMode = {isLoginMode} />}
        <Messenger></Messenger>
      </div>
    </Mainimg>
  );
}

export default Home;
