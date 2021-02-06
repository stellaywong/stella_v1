import React from 'react'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { transitionTimer } from '@util'


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
    font-size: 3.5rem;
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


const items = [
    <StyledSubText>Poet and Software Engineer</StyledSubText>,
    <StyledBigText>Stella Wong</StyledBigText>,
    <StyledLine />,
]


const Hero = (props) => {

    return (
        <StyledHero id="hero">
            <TransitionGroup component={null}>
                {items.map((item, i) => (
                    <CSSTransition key={i} 
                                    classNames="fadeup" 
                                    in={true}
                                    appear={true}
                                    timeout={(i + 1) * 100 + transitionTimer}>
                    <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </StyledHero>
    )
}

export default Hero