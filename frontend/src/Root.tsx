import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { LoginState } from "./recoil/Auth";
import { styled } from "styled-components";
import AlertDialog from "./components/Util/Alert/AlertDialog";
import ConfirmDialog from "./components/Util/Confirm/ConfirmDialog";
import PromptDialog from "./components/Util/Prompt/PromptDialog";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  font-family: "Pretendard-Regular, sans-serif";
`;

function App() {
  const loginState = useRecoilValue(LoginState);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // 로컬스토리지에 이전 페이지 저장
    localStorage.setItem("prevPage", location.pathname);
    // 비로그인 유저면 홈으로 강제이동
    if ( location.pathname !== "/" && ( !loginState || !localStorage.getItem("access_token")) ) {
      navigate("/");
    } else if ( location.pathname === "/" && loginState && localStorage.getItem("access_token") ) {
      navigate("/category");
    }
  }, [loginState, location]);
  // window.location.pathname : URL
  // const location = useLocation() : Location

  return (
    <Container>
      <Outlet />
    </Container>
  );
}

function Root() {
  return (
    <RecoilRoot>
      <AlertDialog>
        <ConfirmDialog>
          <PromptDialog>
            <App />
          </PromptDialog>
        </ConfirmDialog>
      </AlertDialog>
    </RecoilRoot>
  );
}

export default Root;
