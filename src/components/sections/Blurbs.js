import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import ScrollReveal from 'scrollreveal';

 const SectionBlurbs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: #f2f2f2;
 `

 const BlurbContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 `

 const BlurbText = styled.div`
    
 `

 const CiteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
 `

 const CiteProfile = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow:hidden;
 `



const Blurbs = (props) => {
	const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          fields: {
            category: {
              eq: "blurbs"
            }
          }
        }
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              author
              image {
                childImageSharp {
                  fluid(maxWidth: 500, quality: 80) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
	`)

	return (
			<SectionBlurbs>

        <BlurbContainer>
          {data.allMarkdownRemark.edges.map((edge, idx) => {
            const {id, html, frontmatter} = edge.node;
            const { image } = frontmatter;
            if (idx !== 0) return null;
            return <BlurbText key={id}>
              {/* <BlurbIcon>
                <FontAwesomeIcon icon={faQuoteRight} />
              </BlurbIcon> */}
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </BlurbText>
          })}
        </BlurbContainer>
        <CiteContainer>
          {data.allMarkdownRemark.edges.map((edge, idx) => {
            const {id, html, frontmatter} = edge.node;
            const { image } = frontmatter;

            return <CiteProfile key={id}>
               <Img style={{ height: "100%", width: "100%" }}
                            imgStyle={{ objectFit: "contain" }}
                            fluid={image.childImageSharp.fluid} />
            </CiteProfile>
          })}
        </CiteContainer>
      </SectionBlurbs>
	)
}

export default Blurbs