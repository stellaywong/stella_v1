import { createGlobalStyle } from 'styled-components'

import Reset from './reset'
import Fonts from './fonts'



const globalStyle = createGlobalStyle`
    ${Reset};
    ${Fonts};
`


export default globalStyle