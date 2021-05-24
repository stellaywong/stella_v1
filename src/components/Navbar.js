import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { navLinks } from '@config'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const StyledNavbar = styled.nav`
  display: flex;
  position: relative;
  top: 0;
  width: 100%;
  height: var(--nav-height);
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg);
  z-index: 10;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: inherit;
    text-decoration: none;
    letter-spacing: 1px;
    &:hover {
      color: var(--color-secondary);
    }
  }
`

const StyledNavHome = styled.div`
  margin: 5px auto;

  a {
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const StyledNavItems = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;

  li {
    position: relative;
    backface-visibility: hidden;
    margin: 0 5px;
    padding: 5px;
  }
`


const Navbar = (props) => {
    const [isMounted, setIsMounted] = useState(false);
    // const [scrolledToTop, setScrollToTop] = useState(true);
    // const scrollDirection = useScrollDirection('down', 100);

    // const handleScroll = () => {
    // }

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
        <StyledNavbar>
            <StyledContainer>
              {isMounted && (
                <CSSTransition key="home-link"
                                in={true}
                                appear={true}
                                timeout={2000} 
                                classNames="fadedown">
                  <StyledNavHome>
                    <Link to="/">StellaWong</Link>
                  </StyledNavHome>
                </CSSTransition>
              )}
              <StyledNavItems>
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
              </StyledNavItems>
            </StyledContainer>
        </StyledNavbar>
    )
}


export default Navbar