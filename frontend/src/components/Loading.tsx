import { styled } from "styled-components";
import { BackGroundImg } from "./BackGroundImg"
import Header from "./Header/Header"
import Messenger from "./Message/Messenger"
import Loading1 from '/src/components/Loading1';
import Loading2 from '/src/components/Loading2';
import Loading3 from '/src/components/Loading3';

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

function Loading () {
  return(
    <BackGroundImg>
      <Container>
        <Loading1/>
        <Loading2/>
        <Loading3/>
      </Container>
    </BackGroundImg>
  )
}
export default Loading