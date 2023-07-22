import { styled } from "styled-components";
import { BackGroundImg } from "../components/BackGroundImg";
import Header from "../components/Header/Header";
import Messenger from "../components/Message/Messenger";

function FreeBoard () {
  return(
    <BackGroundImg>
      <Header/>
      <h1 style={{margin:'0px', color:'white'}}>
        여기는 자유 게시판!! 이 내용은 지워도 됩니다~~
      </h1>
      <Messenger/>
    </BackGroundImg>
  )
}
export default FreeBoard