import React, { useState } from 'react'
import { Link } from 'gatsby'
import { navLinks } from '@config'
import NavToggle from '../styles/icons/hamburger.js'



const Navbar = (props) => {
    const [showMenu, setShowMenu] = useState(false)
    // const [scrolledToTop, setScrollToTop] = useState(true);
    // const scrollDirection = useScrollDirection('down', 100);

    // const handleScroll = () => {
    // }

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setIsMounted(true);
    //     }, 100);

    //     return () => {
    //         clearTimeout(timeout);
    //     }

    //     // window.addEventListener('scroll', handleScroll);
    // }, [])


    return <div id='nav-container'>
                <Link to="/" className='logo'>Stella Wong</Link>
                <nav>
                  <NavToggle visible={showMenu}
                             onClick={() => setShowMenu(!showMenu)} />
                  <ul id='primary-navigation' className={showMenu ? 'show-mobile' : null}>
                    {navLinks.map(({name, url}, idx) => (
                      <li key={name}>
                        <Link to={url} activeClassName="active">{name}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
            </div>
    
    

    // return (
    //     <StyledNavbar>
    //         <StyledContainer>
    //           {isMounted && (
    //             <CSSTransition key="home-link"
    //                             in={true}
    //                             appear={true}
    //                             timeout={2000} 
    //                             classNames="fadedown">
    //               <StyledNavHome>
    //                 <Link to="/">Stella Wong</Link>
    //               </StyledNavHome>
    //             </CSSTransition>
    //           )}
    //           <StyledNavItems>
    //             <TransitionGroup component={null}>
    //                 {isMounted && (
    //                     navLinks.map(({name, url}, idx) => (
    //                         <CSSTransition key={idx}
    //                                         timeout={2000} 
    //                                         classNames="fadedown">
    //                             <li style={{ transitionDelay: `${idx + 1}00ms` }}>
    //                                 <Link to={url}>{name}</Link>
    //                             </li>
    //                         </CSSTransition>
    //                     ))
    //                 )}
    //             </TransitionGroup>
    //           </StyledNavItems>
    //         </StyledContainer>
    //     </StyledNavbar>
    // )
}


export default Navbar