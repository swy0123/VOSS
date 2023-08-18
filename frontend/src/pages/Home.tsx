import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled, keyframes } from "styled-components";
import Login from "../components/Home/Login/Login";
import Join from "../components/Home/Join/Join";
// import mainimg from "/src/assets/main/mainimg.gif";
import HomeContent from "../components/Home/HomeContent/HomeContent";
import Messenger from "../components/Message/Messenger";
import { useRecoilState } from "recoil";
import { LoginModeAtom } from "../recoil/Auth";
import mainimg from "/src/assets/main/mainimg.gif";
import Custom from "../components/Util/Custom";
import { scrollEventState } from "../recoil/HW_Atom";
import { ContentDiv } from "../components/Home/HomeContent/HomeContent.style";

export const Container = styled.div`
  height: 450vh;
  position: relative;
  overflow: hidden;
`

export const Mainimg = styled.div`
  background-image: url("${mainimg}");
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const pulsate = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

export const ScrollSection = styled.div<{ $isScroll: number }>`
  display: flex;
  flex-direction : column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 65px;
  width: 40px;
  left: 50%;
  top: 88vh;
  opacity: ${({ $isScroll }) => ($isScroll >= 2500 ? "0" : "1")};
  transform: translate(-50%,0);
`
export const Scroll = styled.div`
  width: 40px;
  color: white;
  font-size: 15px;
  text-align: center;
`

export const ScrollImg = styled.img`
  animation: ${pulsate} 1.7s ease-in-out infinite;
  width: 30px;
`

export const ScrollY = styled.div`
  font-size: 10px;
  color: white;
`

function Home() {
  const [loginMode, setLoginMode] = useRecoilState(LoginModeAtom);
  const [isEnd, setIsEnd] = useState(false);

  const endDiv = useRef<HTMLDivElement>(null);

  const [scrollEvent, setScrollEvent] = useRecoilState(scrollEventState);
  
  

  useEffect(() => {
    const handleScroll = (event) => {
      setScrollEvent(window.scrollY)
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    var divTop = endDiv.current?.getBoundingClientRect().bottom;
    console.log(divTop)
  }, [endDiv.current])

  useEffect(() => {
    if(isEnd){
      setIsEnd(false);
      scrollToBottomFast();
    } 

  }, [isEnd])

  // useEffect(() => {
  //   if (scrollEvent < 1000) setLoginMode(true)
  // }, [scrollEvent])

  const scrollToBottom = () => {
    endDiv.current?.scrollIntoView({ behavior: "smooth" });
  };

  const HandleIsEnd = useCallback(() => {
    setIsEnd(!isEnd);
  }, [isEnd]);


  const scrollToBottomFast = () => {
    console.log("scrollToBottomFast")
    endDiv.current?.scrollIntoView({ behavior: "instant" });
  };


  return (
    <div>
      <Container>
        <Mainimg>
          <div>
            {/* <ScrollY>{scrollEvent}</ScrollY> */}
            <HomeContent></HomeContent>
            <ContentDiv $isScroll={scrollEvent}>
              {loginMode ? <Login HandleIsEnd={HandleIsEnd}/> : <Join HandleIsEnd={HandleIsEnd}/>}
            </ContentDiv>
          </div>
          <ScrollSection $isScroll={scrollEvent}>
            <Scroll>scroll</Scroll>
            <ScrollImg src="/src/assets/main/scroll.png" onClick={scrollToBottom}></ScrollImg>
          </ScrollSection>
        </Mainimg>
      </Container>
      <div ref={endDiv}></div>
    </div>
  );
}

export default Home;

