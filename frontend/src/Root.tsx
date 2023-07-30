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
    if (location.pathname !== "/" && !loginState) {
      navigate("/");
    } else if (location.pathname === "/" && loginState) {
      navigate("/category")
    }
  }, [loginState, location, navigate ]);

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
