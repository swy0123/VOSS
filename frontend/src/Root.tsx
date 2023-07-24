import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

function Root() {
  return (
    <RecoilRoot>
      <Container>
        <Outlet />
      </Container>
    </RecoilRoot>
  );
}

export default Root;
