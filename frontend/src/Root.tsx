import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
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
