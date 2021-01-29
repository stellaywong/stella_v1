import React from "react"
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Layout, Hero, Poetry, Interviews, Projects } from '@components'



const IndexPage = ({ data }) => {

  return (
    <Layout>
      <Hero />

      {data.allFile.edges.map(edge => {
        return <Img fluid={edge.node.childImageSharp.fluid} />
      })}
    </Layout>
  )
}


export const query = graphql`
  query{
    allFile(filter:{ relativeDirectory: {eq:"featured"}}) {
      edges {
        node {
          id
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`




export default IndexPage