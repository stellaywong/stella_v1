import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'
import Img from 'gatsby-image'


const Poems = (props) => {
    const query = useStaticQuery(graphql`
      query {
        allMarkdownRemark(
          sort: {
            fields: frontmatter___date
            order: DESC
          },
          filter: {
            fields: {
              category: {
                eq: "poems"
              }
            }
          }
        ) {
          edges {
            node {
              id
              frontmatter {
                publisher
                external_link
                award
                poems
                featuredImage {
                  childImageSharp {
                    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }`)
    
    return (
        <Layout>
          <div className="card-grid">
            {query.allMarkdownRemark.edges.map((edge, i) => {
              const { id } = edge.node;
              const { publisher, featuredImage, external_link, award, poems } = edge.node.frontmatter;

              return <div key={id} className="card">
                        <Img fluid={featuredImage.childImageSharp.fluid} />
                        <div className="card-info">
                          <h3>
                            <a href={external_link} target="_blank">
                              {publisher}
                            </a>
                          </h3>
                          <ul>
                            {poems && poems.map((poem, idx) => <li key={id + "-poem-" + idx}>{poem}</li> )}
                          </ul>
                        </div>
                    </div>
            })}

          </div>
        </Layout>
    )
}

export default Poems