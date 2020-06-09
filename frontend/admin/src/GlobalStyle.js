import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, html {
    box-sizing: border-box;
    font-family: 'Special Elite', cursive;
    height: 100%;
  }

  body {
    margin: 0;
    overflow-y: scroll;
  }

  * {
    box-sizing: border-box;
    user-select: none;
    font-family: 'Special Elite', cursive;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
