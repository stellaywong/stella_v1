import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Layout, Hero, Poetry, Interviews, Projects } from '@components'



const IndexPage = ({ data }) => {

  console.log(data);

  return (
    <Layout>
      <Hero />

      <h1 style={{
        fontFamily: 'Escrow Condensed',
        fontSize: 24,
      }}>TEST</h1>
      {/* {data.allFile.edges.map(edge => {
        return <Img fluid={edge.node.childImageSharp.fluid} />
      })} */}
    </Layout>
  )
}


export const query = graphql`
  query {
    allMarkdownRemark (
      filter: {
        frontmatter: {
          featured: {
            eq: true
          }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            external_link
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`




export default IndexPage