import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Layout, Hero, Featured, Interviews, Projects } from '@components'



const IndexPage = ({ data }) => {

  console.log(data);

  return (
    <Layout>

      <main>
        <Hero />
        <Featured />
      </main>
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