import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *:before, *:after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body, html {
    height: 100%;
    width: 100%;
  }

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    overflow-y: scroll;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;