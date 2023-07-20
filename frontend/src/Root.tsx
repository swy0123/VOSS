import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header/Header";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function Root() {
  return (
    <Container>
    {/* <div> */}
      <Outlet />
    {/* </div>  */}
    </Container>
  );
}

export default Root;
