import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  body {
    background: #fff;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, button {
    font: 16px 'Raleway', sans-serif;
  }

  button {
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }

  b {
    font-weight: 600;
  }

  strong {
    font-weight: 700;
  }
`;
