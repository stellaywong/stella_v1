import React from 'react'

import { Head, Navbar, Footer } from '@components'
import { GlobalStyle } from '@styles'


const Layout = (props) => {

    return (<>
        <Head />
        <GlobalStyle />

        <div id="root">
            <Navbar />

            <div id="content">
                {props.children}
            </div>
            
            <Footer />
        </div>
    </>)
}


export default Layout