import { css } from "styled-components"

import DancingScriptRegularTTF from '@fonts/dancing-script-regular.ttf';
import LatoBoldTTF from '@fonts/lato-bold.ttf';
import LatoRegularTTF from '@fonts/lato-regular.ttf';
import RobotoRegularTTF from '@fonts/roboto-regular.ttf';
import RobotoBoldTTF from '@fonts/roboto-bold.ttf';
import CormorantGaramondRegularTTF from '@fonts/CormorantGaramond-Regular.ttf';
import CormorantGaramondLightTTF from '@fonts/CormorantGaramond-Light.ttf';

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

const CormorantGaramondFont = {
    family: 'CormorantGaramond',
    normal: {
        400: [CormorantGaramondLightTTF],
        700: [CormorantGaramondRegularTTF],
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
    ${createFontFace(dancingStriptFont)}
    ${createFontFace(LatoFont)}
    ${createFontFace(MontserratFont)}
    ${createFontFace(CormorantGaramondFont)}
`;


export default fonts;