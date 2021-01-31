import { createGlobalStyle } from 'styled-components'

import Reset from './reset'
import Fonts from './fonts'



const globalStyle = createGlobalStyle`
    ${Reset};
    ${Fonts};

    :root {
        --color-beige: #f2f3ee;
        --color-black: #010101;
        --color-gray: #5d5d5d;
        --color-coral: #bc4e5b;

        --font-text: 'Exchange', serif;
        --font-header: 'Escrow Condensed', serif;
    }


    body {
        font-size: 16px;
        background-color: var(--color-beige);
        color: var(--color-black);
        font-family: var(--font-text);
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


    main {
        width: 100%;
        max-width: 1600px;
        min-height: 100vh;
        margin: 0px auto;
        padding: 0px 150px;
    }
`


export default globalStyle