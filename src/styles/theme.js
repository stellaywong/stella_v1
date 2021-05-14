import mixins from './mixins'

const theme = {
    structure: {
        mobileS: 360,
        tabletS: 540,       // Surface Duo
        tabletM: 770,       // iPad
        tabletL: 1024,          // iPad Pro
        desktopS: 1280,
        desktopM: 1600,
        desktopL: 1920,
    },

    container: {
        large: 1400,
    },

    mixins,
}


export default theme;