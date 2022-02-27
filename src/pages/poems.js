import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
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

              const classes = ["card"];
              featuredImage && classes.push("featured");

              return <div className="card">
                        <Img fluid={featuredImage.childImageSharp.fluid} />
                        <div className="card-desc">
                          <h3>
                            <Link to={external_link} target="_blank">
                              {publisher}
                            </Link>
                          </h3>
                          <ul>
                            {poems && poems.map((poem, idx) => <li key={id + "-poem-" + idx}>{poem}</li> )}
                          </ul>
                        </div>
                    </div>

              // return (
              //   <StyledPoem>
              //     {featuredImage && <>
              //     {award && <div className="ribbon ribbon-top-right"><span>{award}</span></div>}
              //     <a key={id} target="_blank" href={external_link} rel="noreferrer" >
              //       <Img fluid={featuredImage.childImageSharp.fluid} /></a></>}
              //     <StyledPoemContent>
              //       <h3>{publisher}</h3>
              //       {poems && poems.map((poem, idx) => <p key={id + "-poem-" + idx}>{poem}</p>)}
              //     </StyledPoemContent>
              //   </StyledPoem>
              // )
            })}

          </div>

          {/* <StyledContainer>
            <StyledGrid>
              {query.allMarkdownRemark.edges.map((edge, i) => {
                const { id } = edge.node;
                const { publisher, featuredImage, external_link, award, poems } = edge.node.frontmatter;
                return (
                  <StyledPoem>
                    {featuredImage && <>
                    {award && <div className="ribbon ribbon-top-right"><span>{award}</span></div>}
                    <a key={id} target="_blank" href={external_link} rel="noreferrer" >
                      <Img fluid={featuredImage.childImageSharp.fluid} /></a></>}
                    <StyledPoemContent>
                      <h3>{publisher}</h3>
                      {poems && poems.map((poem, idx) => <p key={id + "-poem-" + idx}>{poem}</p>)}
                    </StyledPoemContent>
                  </StyledPoem>
                )
              })}
            </StyledGrid>
          </StyledContainer> */}
        </Layout>
    )
}

export default Poems