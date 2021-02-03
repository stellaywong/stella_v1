import { css } from "styled-components"



import DancingScriptRegularTTF from '@fonts/dancing-script-regular.ttf';
import LatoBoldTTF from '@fonts/lato-bold.ttf';
import LatoRegularTTF from '@fonts/lato-regular.ttf';
import RobotoRegularTTF from '@fonts/Roboto-Regular.ttf';
import RobotoBoldTTF from '@fonts/Roboto-Bold.ttf';


// import EscrowBoldWoff2 from '@fonts/escrow-condensed-bold.woff2';
// import EscrowRegularWoff2 from '@fonts/escrow-condensed-regular.woff2';
// import ExchangeItalicWoff2 from '@fonts/exchange-italic.woff2';
// import ExchangeMediumWoff2 from '@fonts/exchange-medium.woff2';
// import ExchangeRegularWoff2 from '@fonts/exchange-regular.woff2';


const dancingStriptFont = {
    family: 'Dancing Script',
    normal: {
        400: [DancingScriptRegularTTF],
    }
}

const LatoFont = {
    family: 'Lato',
    normal: {
        400: [LatoRegularTTF],
        700: [LatoBoldTTF],
    }
}

const MontserratFont = {
    family: 'Roboto',
    normal: {
        400: [RobotoRegularTTF],
        700: [RobotoBoldTTF],
    }
}


// const escrowFont = {
//     family: 'Escrow Condensed',
//     normal: {
//         400: [EscrowRegularWoff2],
//         700: [EscrowBoldWoff2],
//     }
// }

// const exchangeFont = {
//     family: 'Exchange',
//     normal: {
//         400: [ExchangeRegularWoff2],
//         500: [ExchangeMediumWoff2],
//     },
//     italic: {
//         400: [ExchangeItalicWoff2],
//     }
// }


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
    ${createFontFace(dancingStriptFont)}
    ${createFontFace(LatoFont)}
    ${createFontFace(MontserratFont)}
`;


export default fonts;
