import { createGlobalStyle, keyframes } from 'styled-components';
import tentacleImage from './assets/tentacle-left.png';

const tentacleAnimation = keyframes`
  from {
    background-position: -500px 100px;
  }
  to {
    background-position: -100px 100px;
  }
`;

export const GlobalStyles = createGlobalStyle`
  body {
    text-align: center;
    min-height: 100vh;
    color: white;
    line-height: 1.2;
    -webkit-font-smoothing: antialiased;
    background-color: #21248d;
    background-image: url(${tentacleImage});
    background-repeat: no-repeat;
    background-size: auto;
    background-position: -100px 100px;
    animation-name: ${tentacleAnimation};
    animation-duration: 4s;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .screenreader-only {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
    color: black;
  }
`;
