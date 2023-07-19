import React, { useState } from "react";
import { styled } from "styled-components";
import Login from "../components/Login";
import Join from "../components/Join";
import MainImg from "../assets/MainImg.jpg";

const BackgroundImg = styled.div`
  background-image: url("${MainImg}");
  background-repeat: no-repeat;
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
    <BackgroundImg>
      <div>
        {loginMode ? 
        <Login isLoginMode = {isLoginMode} /> : 
        <Join isLoginMode = {isLoginMode} />}
      </div>

      

    </BackgroundImg>
  );
}

export default Home;
