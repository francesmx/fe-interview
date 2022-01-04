import { createGlobalStyle, keyframes } from 'styled-components';
import tentacleImage from './assets/tentacle-left.png';
import { StyleConstants } from './shared/utils/constants';

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
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.2;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: url('./assets/pizza-cursor.svg') 2 2, auto;
    background-color: ${StyleConstants.COLOURS.cleoBlue};
    background-image: url(${tentacleImage});
    background-repeat: no-repeat;
    background-size: auto;
    background-position: -100px 100px;
    animation-name: ${tentacleAnimation};
    animation-duration: 4s;
  }

  a {
    cursor: url('./assets/eyes-cursor.svg') 5 12, auto;
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
