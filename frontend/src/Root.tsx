import React, { useEffect  } from "react";
import { Outlet, useNavigate, useLocation} from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { LoginState } from "./recoil/Auth";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

function App() {
  const loginState = useRecoilValue(LoginState);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // 로컬스토리지에 이전 페이지 저장
    localStorage.setItem('prevPage', location.pathname)
    // 비로그인 유저면 홈으로 강제이동
    if (location.pathname !== "/" && !loginState) {
      navigate("/");
    } else if (location.pathname === "/" && loginState) {
      navigate("/category")
    }
  }, [loginState, location ]);
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
      <App />
    </RecoilRoot>
  );
}

export default Root;
