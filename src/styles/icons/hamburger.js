import React from 'react'

const Hamburger = ({ visible, ...restProps }) => {
  const classes = ["hamburger"]
  if (visible) classes.push("active")

  return <div className={classes.join(" ")} {...restProps}>
          <span className='hamburger-inner' />
          <span className='hamburger-inner' />
          <span className='hamburger-inner' />
        </div>
  return <svg viewBox="0 0 50 50" width="30" height="30" {...restProps}>
          <rect y="0" width="60" height="10" transform={!visible ? "translate(6) rotate(45)" : null}>  </rect>
          <rect y="0" width="60" height="10" transform={!visible ? "translate(6) rotate(-45)" : null}></rect>
          <rect y="0" width="60" height="10" transform={!visible ? "translate(6) rotate(45)" : null}></rect>
        </svg>
}

export default Hamburger;