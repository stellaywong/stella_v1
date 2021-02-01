import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Head, Navbar, Footer } from '@components'
import { GlobalStyle, theme } from '@styles'
import styled from 'styled-components'


const StyledMain = styled.main`
    width: 100%;
    max-width: ${theme.container.large}px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 2rem;

    @media (min-width: ${theme.structure.tabletS}px) {
        padding: 0 150px;
    }
`


const Layout = (props) => {

    return (<>
        <Head />

        <div id="root">
            <ThemeProvider theme={theme}>
                <GlobalStyle />

                <Navbar />

                <StyledMain>
                    {props.children}
                </StyledMain>
                
                <Footer />
            </ThemeProvider>



        </div>
    </>)
}


export default Layout