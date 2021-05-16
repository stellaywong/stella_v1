import { css } from 'styled-components'
import { transition } from '@utils/util'

// https://reactcommunity.org/react-transition-group/css-transition

const transitionStyle = css`
  .slideBigRight-appear,
  .slideBigRight-enter {
    transform: translateX(100vw);
    transition: transform ${transition.normal}ms ease-in;
  }
  .slideBigRight-appear-active,
  .slideBigRight-enter-active {
    transform: translateX(0px);
    transition: transform ${transition.normal}ms ease-in;
  }
  .slideBigRight-exit {
    transform: translateX(0px);
    transition: transform ${transition.normal}ms ease-in;
  }
  .slideBigRight-exit-active {
    transform: translateX(100vw);
    transition: transform ${transition.normal}ms ease-in;
  }


  /* Fade up */
  .fadeup-appear,
  .fadeup-enter {
    opacity: 0.01;
    transform: translateY(20px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  .fadeup-appear-active,
  .fadeup-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  
  /* Fade down */
  .fadedown-appear,
  .fadedown-enter {
    opacity: 0.01;
    transform: translateY(-20px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  .fadedown-appear-active,
  .fadedown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }

  /* Fade Left */
  .fadeleft-appear,
  .fadeleft-enter {
    opacity: 0.01;
    transform: translateX(-20px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  .fadeleft-appear-active,
  .fadeleft-enter-active {
    opacity: 1;
    transform: translateX(0px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  .fadeleft-exit {
    opacity: 1;
    transform: translateX(0px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  .fadeleft-exit-active {
    opacity: 0.01;
    transform: translateX(-20px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }

  /* Fade Right */
  .faderight-appear,
  .faderight-enter {
    opacity: 0.01;
    transform: translateX(20px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  .faderight-appear-active,
  .faderight-enter-active {
    opacity: 1;
    transform: translateX(0px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  .faderight-exit {
    opacity: 1;
    transform: translateX(0px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }
  .faderight-exit-active {
    opacity: 0.01;
    transform: translateX(20px);
    transition: opacity ${transition.normal}ms ease-in, transform ${transition.normal}ms ease-in;
  }

  /* Fade */
  .fade-appear,
  .fade-enter {
    opacity: 0;
  }
  .fade-appear-active,
  .fade-appear-done,
  .fade-enter-active,
  .fade-enter-done {
    opacity: 1;
    transition: opacity ${transition.normal}ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity ${transition.normal}ms ease-in;
  }
`;

export default transitionStyle;