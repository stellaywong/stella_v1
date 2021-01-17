import React from 'react'

import { Header, Navbar, Footer } from '@components'

const Layout = (props) => {

    return (
        <div id="root">
            <Header />
            <Navbar />

            {props.children}
            
            <Footer />
        </div>
    )
}


export default Layout