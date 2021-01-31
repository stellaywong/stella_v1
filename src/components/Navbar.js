import React from 'react'
import styled from 'styled-components'

const StyledNav = styled.nav`
    display: flex;
    position: fixed;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
`

const StyledLogo = styled.h1`
    margin: 0;
`


const Navbar = (props) => {

    return (
        <StyledNav>
            <span>Work</span>
            <StyledLogo>SW</StyledLogo>
            <span>About</span>
        </StyledNav>
    )
}


export default Navbar