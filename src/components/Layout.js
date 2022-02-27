import '../styles/styles.scss'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Head, Navbar } from '@components'
import { GlobalStyle, theme } from '@styles'
import styled from 'styled-components'


const StyledMain = styled.main`
    width: 100%;
    max-width: ${theme.container.xlarge}px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 2rem;

    @media (min-width: ${theme.structure.desktopS}px) {
        padding: 0 150px;
    }
`


const Layout = (props) => {
    return (<>
        <Head />

        <div id="root">
            <ThemeProvider theme={theme}>
                {/* <GlobalStyle /> */}
                <Navbar />
                <div className='main-container'>
                    {props.children}
                </div>
            </ThemeProvider>
        </div>
    </>)
}


export default Layout