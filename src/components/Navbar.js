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
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;

    @media (min-width: ${({theme}) => theme.structure.tabletS}px) {
        padding: 1rem 3rem;
    }


    .transition-enter {
        opacity: 0.01;
        transform: translate(0, -10px);
    }

    .transition-enter-active {
        opacity: 1;
        transform: translate(0, 0);
        transition: opacity 500ms ease-in;
    }

    .transition-exit {
        opacity: 1;
        transform: translate(0, 0);
    }

    .transition-exit-active {
        opacity: 0.01;
        transform: translate(0, 10px);
        transition: opacity 500ms ease-in;
    }
`

const StyledLogo = styled.h1`
    margin: 0;
`

const StyledNav = styled.ol`
    display: flex;
    margin: 0;
    list-style: none;

    li {
        margin: 0 5px;
        padding: 10px;
        counter-increment: item 1;

        &::marker {
            color: var(--color-highlight);
        }
    }

    a {
        color: inherit;
        text-decoration: none;

        &:before {
            content: '0' counter(item) '.';
            margin-right: 5px;
            color: var(--color-highlight);
            // font-size: var(--fz-xxs);
            text-align: right;
          }
    }
`


const Navbar = (props) => {
    const [scrolledToTop, setScrollToTop] = useState(true);
    const scrollDirection = useScrollDirection('down', 100);

    const handleScroll = () => {
        // console.log(window.pageYOffset);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])


    return (
        <StyledContainer>
            <div key="glue">
                <StyledLogo key="abc">SW</StyledLogo>

            </div>

                <TransitionGroup component={StyledNav}>
                    {navLinks.map(({name, url}, idx) => (
                        <CSSTransition key={idx}
                                        in={true}
                                        appear={true} 
                                        timeout={300} 
                                        classNames="fadeup">
                            <li style={{ transitionDelay: `${idx + 1}00ms` }}>
                                <Link to={url}>{name}</Link>
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>

        </StyledContainer>
    )
}


export default Navbar