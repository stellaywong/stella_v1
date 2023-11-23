import React from 'react'

const Hamburger = ({ visible, ...restProps }) => {
  const classes = ["hamburger"]
  if (visible) classes.push("active")

  return <div className={classes.join(" ")} {...restProps}>
          <span className='hamburger-inner' />
          <span className='hamburger-inner' />
          <span className='hamburger-inner' />
        </div>
}

export default Hamburger;