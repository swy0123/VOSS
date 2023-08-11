import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import router from "./Router";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { styled,createGlobalStyle } from "styled-components";

const GlobalFontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular, sans-serif';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RecoilRoot>
        <GlobalFontStyle/>
        <RouterProvider router={router}/>
      </RecoilRoot>
    </ThemeProvider>
  // </React.StrictMode>
);