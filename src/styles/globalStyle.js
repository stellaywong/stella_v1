import { createGlobalStyle } from 'styled-components'

import Reset from './reset'
import Fonts from './fonts'
import theme from './theme'
import TransitionStyle from './transitionStyle'



const globalStyle = createGlobalStyle`
    ${Reset};
    ${Fonts};

    :root {
        --color-beige: #f2f3ee;
        --color-black: #010101;
        --color-gray: #5d5d5d;
        --color-coral: #bc4e5b;

        --color-bg: var(--color-beige);
        --color-primary: var(--color-black);
        --color-secondary: var(--color-coral);

        --font-text: 'Roboto', serif;
        --font-header: 'Lato', serif;
        --font-sub: 'Dancing Script', serif;
    }


    body {
        font-size: 14px;
        background-color: var(--color-bg);
        color: var(--color-primary);
        font-family: var(--font-text);
        line-height: 1.3;

        @media (min-width: ${theme.structure.tabletS}px) {
            font-size: 16px;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: var(--font-header);
    }

    h1 {
        font-size: 2.2rem;
    }

    h2 {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.8rem;
    }

    h4 {
        font-size: 1.6rem;
    }

    h5 {
        font-size: 1.4rem;
    }

    h6 {
        font-size: 1.2rem;
    }

    .link-effect-underline {
        position: relative;
        text-decoration: none;

        &:before {
            position: absolute;
            content: '';
            bottom: 0;
            overflow: hidden;
            width: 0px;
            border-bottom: 2px solid var(--color-secondary);
            transition: width 500ms;
        }

        &:hover {
            &:before {
                width: 100%;
            }
        }
    }

    ${TransitionStyle}
`


export default globalStyle