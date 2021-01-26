import React from 'react'

import { Header, Navbar, Footer } from '@components'
import { GlobalStyle } from '@styles'


const Layout = (props) => {

    return (
        <div id="root">
            <GlobalStyle />
            <Header />
            <Navbar />

            {props.children}
            
            <Footer />
        </div>
    )
}


export default Layout