import React from "react"

import { Layout, Hero, Poetry, Interviews, Projects } from '@components'



const IndexPage = (props) => {
  return (
    <Layout>
      <Hero />
      <Poetry />
      <Interviews />
      <Projects />
    </Layout>
  )
}



export default IndexPage