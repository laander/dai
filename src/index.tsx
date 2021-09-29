import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
