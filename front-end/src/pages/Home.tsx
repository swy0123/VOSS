import { styled } from "styled-components";
import Login from "../components/Login";
import MainImg from "../assets/MainImg.jpg";

const BackgroundImg = styled.div`
  background-image: url("${MainImg}");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

function Home() {
  return (
    <BackgroundImg>
      <h1>Home</h1>
      <Login />
    </BackgroundImg>
  );
}

export default Home;
