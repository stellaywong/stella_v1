import { css } from 'styled-components'

const transitionStyle = css`
  .ribbon {
    position: absolute;
    width: 150px;
    height: 150px;
    font-size: 12px;
    overflow: hidden;
    z-index: 1;

    &::before,
    &::after {
      display: block;
      position: absolute;
      content: '';
      border: 5px solid #2980b9;
      z-index: -1;
    }

    &.ribbon-top-left {
      top: -10px;
      left: -10px;

      &::before {
        top: 0;
        right: 5px;
      }

      &::after {
        bottom: 5px;
        left: 0;
      }

      span {
        right: -25px;
        top: 30px;
        transform: rotate(-45deg);
      }
    }

    &.ribbon-top-right {
      top: -10px;
      right: -10px;

      &::before {
        top: 0;
        left: 5px;
      }

      &::after {
        bottom: 5px;
        right: 0;
      }

      span {
        left: -25px;
        top: 30px;
        transform: rotate(45deg);
      }
    }

    &.ribbon-bottom-left {
      bottom: -10px;
      left: -10px;

      &::before {
        bottom: 0;
        right: 5px;
      }

      &::after {
        top: 5px;
        left: 0;
      }

      span {
        right: -25px;
        bottom: 30px;
        transform: rotate(225deg);
      }
    }

    &.ribbon-bottom-right {
      bottom: -10px;
      right: -10px;
      
      &::before {
        bottom: 0;
        left: 5px;
      }

      &::after {
        top: 5px;
        right: 0;
      }

      span {
        left: -25px;
        bottom: 30px;
        transform: rotate(-225deg);
      }
    }

    span {
      display: block;
      position: absolute;
      width: 225px;
      padding: 15px 0;
      background-color: #3498db;
      box-shadow: 0 5px 10px rgb(0 0 0 / 10%);
      color: #fff;
      text-shadow: 0 1px 1px rgb(0 0 0 / 20%);
      text-align: center;
    }
  }
`

export default transitionStyle;