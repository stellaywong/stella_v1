import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


const StyledHero = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;
    min-height: 100vh;
`

const StyledBigText = styled.h1`
    font-size: 4rem;
    margin-bottom: 1rem;
    @media (min-width: ${({theme}) => theme.structure.tabletM}px) {
        font-size: 6rem;
    }
`

const StyledSubText = styled.span`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-secondary);
    font-family: var(--font-sub);
    @media (min-width: ${({theme}) => theme.structure.tabletM}px) {
        font-size: 2.5rem;
    }
`

const StyledLine = styled.div`
    width: 20vw;
    max-width: 100px;
    height: 4px;
    margin: 3rem auto 0;
    background-color: black;
`


const Hero = (props) => {

    return (
        <StyledHero id="hero">
            <StyledSubText>Poet and Software Engineer</StyledSubText>
            <StyledBigText>Stella Wong</StyledBigText>
            <StyledLine />
        </StyledHero>
    )
}

export default Hero