import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { transitionTimer } from '@utils/util'


const StyledContainer = styled.div`
  padding: 5rem 0;
  min-height: 100vh;
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`

const StyledPoem = styled.div`
  .gatsby-image-wrapper {
    height: 300px;

    img {
      object-position: top !important;
    }
  }

  a {
    display: block;
    position: relative;
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
                    fluid(maxWidth: 800, quality: 70) {
                      ...GatsbyImageSharpFluid
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
          <StyledContainer>
            <StyledGrid>
              {query.allMarkdownRemark.edges.map((edge, i) => {
                const { id } = edge.node;
                const { publisher, featuredImage, external_link, award, poems } = edge.node.frontmatter;
                return (
                  <StyledPoem>
                    {featuredImage &&
                    <a key={id} target="_blank" href={external_link}>
                      {award && <div className="ribbon ribbon-top-right"><span>{award}</span></div>}
                      <Img fluid={featuredImage.childImageSharp.fluid} /></a>}
                    <StyledPoemContent>
                      <h3>{publisher}</h3>
                      {poems && poems.map((poem, idx) => <p key={id + "-poem-" + idx}>{poem}</p>)}
                    </StyledPoemContent>
                  </StyledPoem>
                )
              })}
            </StyledGrid>
          </StyledContainer>
        </Layout>
    )
}

export default Poems