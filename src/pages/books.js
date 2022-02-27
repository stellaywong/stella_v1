import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'
import styled from 'styled-components'
import Img from 'gatsby-image'

const StyledContainer = styled.div`
  padding: 2rem 0;
  min-height: 100vh;
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`

const StyledPoem = styled.div`
  position: relative;

  a {
    display: block;
    position: relative;
    overflow: hidden;
    
    .gatsby-image-wrapper {
      height: 400px;
      transition: transform 200ms ease-in;
  
      img {
        object-position: top !important;
      }
    }

    &:hover {
      .gatsby-image-wrapper {
        transform: scale(1.05);
      }
    }
  }
`

const StyledPoemContent = styled.div`
  padding-top: 10px;
  text-align: center;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    color: #999;
  }
`


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
          const { image, author } = frontmatter;

          return <div>
              <Img fluid={image.childImageSharp.fluid} />
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        })}
    </Layout>
}

export default Books