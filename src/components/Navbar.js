import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { navLinks } from '@config'
import { useScrollDirection } from '@hooks'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const StyledContainer = styled.nav`
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--color-bg);
    z-index: 10;
    
    @media (min-width: ${({theme}) => theme.structure.tabletS}px) {
        padding: 1rem 3rem;
    }
`



const StyledNav = styled.ul`
    display: flex;
    margin: 0;
    list-style: none;

    li {
        position: relative;
        backface-visibility: hidden;
        margin: 0 5px;
        padding: 10px;
    }

    a {
        color: inherit;
        text-decoration: none;
        letter-spacing: 1px;
    }
`


const Navbar = (props) => {
    const [isMounted, setIsMounted] = useState(false);
    const [scrolledToTop, setScrollToTop] = useState(true);
    const scrollDirection = useScrollDirection('down', 100);

    const handleScroll = () => {
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 100);

        return () => {
            clearTimeout(timeout);
        }

        // window.addEventListener('scroll', handleScroll);
    }, [])


    return (
        <StyledContainer>
            <StyledNav>
                <TransitionGroup component={null}>
                    {isMounted && (
                        navLinks.map(({name, url}, idx) => (
                            <CSSTransition key={idx}
                                            timeout={2000} 
                                            classNames="fadedown">
                                <li style={{ transitionDelay: `${idx + 1}00ms` }}>
                                    <Link to={url}>{name}</Link>
                                </li>
                            </CSSTransition>
                        ))
                    )}
                </TransitionGroup>
            </StyledNav>
        </StyledContainer>
    )
}


export default Navbar