import { css } from "styled-components"

import EscrowBoldWoff2 from '@fonts/escrow-condensed-bold.woff2';
import EscrowRegularWoff2 from '@fonts/escrow-condensed-regular.woff2';
import ExchangeItalicWoff2 from '@fonts/exchange-italic.woff2';
import ExchangeMediumWoff2 from '@fonts/exchange-medium.woff2';
import ExchangeRegularWoff2 from '@fonts/exchange-regular.woff2';


const escrowFont = {
    family: 'Escrow Condensed',
    normal: {
        400: [EscrowRegularWoff2],
        700: [EscrowBoldWoff2],
    }
}

const exchangeFont = {
    family: 'Exchange',
    normal: {
        400: [ExchangeRegularWoff2],
        500: [ExchangeMediumWoff2],
    },
    italic: {
        400: [ExchangeItalicWoff2],
    }
}


const createFontFace = (font, style='normal') => {
    let fontFace = '';

    Object.entries(font[style]).forEach(([weight, url]) => {
        fontFace += `
            @font-face {
                font-family: '${font.family}';
                src: url(${url}) format('woff2');
                font-weight: ${weight};
                font-style: ${style};
            }
        `;
    })

    return fontFace;
}


const fonts = css`
    ${createFontFace(escrowFont)}
    ${createFontFace(exchangeFont)}
    ${createFontFace(exchangeFont, 'italic')}
`;


export default fonts;
