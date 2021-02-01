import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


const StyledHero = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    text-align: center;
    margin: 10rem auto;
`

const StyledBigText = styled.h1`
    font-size: clamp(2rem, 10vw, 6rem);
    margin-bottom: 1rem;
`

const StyledSubText = styled.span`
    font-size: 1.1rem;
    color: var(--color-secondary);
`

const GoToContent = styled.div`
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 0;

    a {
        color: inherit;
        font-size: 30px;
    }
`


const Hero = (props) => {

    return (
        <StyledHero id="hero">
            <StyledSubText>Poet, Software Engineer</StyledSubText>
            <StyledBigText>Stella Wong</StyledBigText>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </StyledHero>
    )
}

export default Hero