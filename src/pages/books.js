import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'
import Img from 'gatsby-image'


const Books = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: {
          fields: frontmatter___date
          order: DESC
        },
        filter: {
          fields: {
            category: {
              eq: "books"
            }
          }
        }
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              title
              image {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
    
    return <Layout>
        {data.allMarkdownRemark.edges.map((edge, idx) => {
          const { id, html, frontmatter } = edge.node;
          const { image } = frontmatter;

          return <div key={id}>
                  <Img fluid={image.childImageSharp.fluid} />
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
        })}
    </Layout>
}

export default Books