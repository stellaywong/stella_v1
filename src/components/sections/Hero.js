import React from 'react'
import styled from 'styled-components'


const StyledHero = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

const StyledBigText = styled.div`
    font-size: clamp(2rem, 12vw, 6rem);
    font-family: var(--font-header);
    font-weight: 700;
    line-height: 1.1;
`

const StyledSubText = styled(StyledBigText)`
    font-size: clamp(1.5rem, 2vw, 2rem);
    color: var(--color-gray);
`


const Hero = (props) => {

    return (
        <StyledHero>
            <StyledBigText>Stella Wong</StyledBigText>
            <StyledSubText>Poet and Software Engineer</StyledSubText>
        </StyledHero>
    )
}

export default Hero