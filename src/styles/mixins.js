import { css } from 'styled-components'


const mixins = {
  clearfix: css`
    &::after {
      content: "";
      clear: both;
      display: table;
    }
  `,
  
  fullWidth: css`
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  `
}


export default mixins;