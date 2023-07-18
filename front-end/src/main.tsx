import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from "./Router";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>
);