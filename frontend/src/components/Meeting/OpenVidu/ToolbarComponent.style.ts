import { styled } from "styled-components";

export const AppBar = styled.div`
  position: fixed;
  width: 100%;
  bottom: 10px;
  height: 5%;
`;

export const Toolbar = styled.div`
  position: relative;
`;

export const ToolBarSetDiv = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export const ToolBarIconDiv = styled.div`
  float: left;
  margin: 0 20px;
`;

export const ToolBarIcon = styled.img`
  height: 40px;
  width: 40px;
  cursor: pointer;
`;
