import { css } from 'styled-components';

// https://reactcommunity.org/react-transition-group/css-transition

const transitionStyle = css`
  /* Fade up */
  .fadeup-appear {
    opacity: 0.01;
    transform: translateY(20px);
    transition: opacity 300ms ease-in;
  }
  .fadeup-appear-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms ease-in;
  }
  .fadeup-enter {
    opacity: 0.01;
    transform: translateY(20px);
    transition: opacity 300ms ease-in;
  }
  .fadeup-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms ease-in;
  }
  /* Fade down */
  .fadedown-enter {
    opacity: 0.01;
    transform: translateY(-20px);
    transition: opacity 300ms ease-in;
  }
  .fadedown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms ease-in;
  }
  /* Fade */
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-in;
  }
`;

export default transitionStyle;