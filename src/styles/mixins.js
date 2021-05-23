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
  `,

  textOutline: (color) => (css`
    text-shadow: -1px -1px 0 ${color}, 1px -1px 0 ${color}, -1px 1px 0 ${color}, 1px 1px 0 ${color};
  `)

}


export default mixins;