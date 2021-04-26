import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import ScrollReveal from 'scrollreveal';

 const StyledBlurbs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
 `

 const StyledContainer = styled.div`
    display: flex;
 `

 const BlurbItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
 `

 const BlurbIcon = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    veritical-align: middle;
    padding: 10px;
    border: 1px solid black;
    border-radius: 50px;

    &:after {
      content: '';
      float:left;
      width: auto;
      padding-bottom: 100%;
    }
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
            }
          }
        }
      }
    }
	`)


    console.log(data)
	return (
			<StyledBlurbs>
        <StyledContainer>
          {data.allMarkdownRemark.edges.map(edge => {
            const {id, html, frontmatter} = edge.node;
            return <BlurbItem key={id}>
              <BlurbIcon>
                <FontAwesomeIcon icon={faQuoteRight} />
              </BlurbIcon>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </BlurbItem>
            
          })}
        </StyledContainer>
      </StyledBlurbs>
	)
}

export default Blurbs