import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import ScrollReveal from 'scrollreveal';
import { CSSTransition } from 'react-transition-group'
import { transitionTimer } from '@utils/util'

 const SectionBlurbs = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25rem;
  background: #f2f2f2;
  width: 1000px;
  margin: 0 auto;

 `

 const BlurbContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
 `

 const BlurbText = styled.div`
    
 `

 const CiteContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
 `

 const CiteProfile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: grayscale(100%);
  overflow:hidden;

  &::active {
    filter: grayscale(0%);
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

  const [activeIdx, setActiveIdx] = useState(0);
  const [animateIn, setAnimateIn] = useState(true);

  useEffect(() => {
    const { edges } = data.allMarkdownRemark;
    const currentIdx = activeIdx;

    if(!animateIn) setAnimateIn(true);

    setTimeout(() => {
      setAnimateIn(false);
      setTimeout(() => {
        setActiveIdx((currentIdx + 1) % data.allMarkdownRemark.edges.length);
      }, transitionTimer);
    }, 3000);
	}, [activeIdx]);

	return (
			<SectionBlurbs>
        

        <BlurbContainer>
          {data.allMarkdownRemark.edges.map((edge, idx) => {
            const {id, html, frontmatter} = edge.node;
            const isActive = activeIdx === idx;

            return <CSSTransition key={id + "-blurb"}
                                      in={isActive && animateIn}
                                      classNames="fadeleft"
                                      timeout={transitionTimer}
                                      unmountOnExit>
                      <BlurbText>
                        {/* <BlurbIcon>
                          <FontAwesomeIcon icon={faQuoteRight} />
                        </BlurbIcon> */}
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                      </BlurbText>
                  </CSSTransition>
          })}
        </BlurbContainer>

        <CiteContainer>
          {data.allMarkdownRemark.edges.map((edge, idx) => {
            const {id, html, frontmatter} = edge.node;
            const { image } = frontmatter;

            const isActive = activeIdx === idx;

            return <CiteProfile key={id} style={{filter: isActive ? "grayscale(0%)" : null}}>
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