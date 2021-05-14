import { css } from 'styled-components'


const mixins = {
  clearfix: css`
    &::after {
      content: "";
      clear: both;
      display: table;
    }
  `
}


export default mixins;