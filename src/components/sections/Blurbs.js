import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import ScrollReveal from 'scrollreveal';
import { CSSTransition } from 'react-transition-group'
import { transition } from '@utils/util'

 const SectionBlurbs = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  width: 1000px;
  height: 700px;
  padding: 5rem 0;
  margin: 0 auto;

 `

 const BlurbContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
  align-items: center;
 `

 const BlurbText = styled.div`
  padding: 1rem;
  border: 1px solid;
  border-radius: 10px;
  position: relative;

  blockquote {
    padding: 1rem;
    margin: 0;
  }
 `

 const QuoteIcon = styled.div`
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  veritical-align: middle;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  border: 1px solid black;
  border-radius: 50px;
  background: #f2f2f2;

  &:after {
    content: '';
    float:left;
    width: auto;
    padding-bottom: 100%;
  }
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
  p {
    text-align: center;
    margin-top: 5px;
    font-weight: 600;
  }
 `

 const CiteImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: grayscale(100%);
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
      }, transition.normal);
    }, 7000);
	}, [activeIdx]);

	return (
			<SectionBlurbs>
        

        <BlurbContainer>
          {data.allMarkdownRemark.edges.map((edge, idx) => {
            const {id, html, frontmatter} = edge.node;
            const {author} = frontmatter;
            const isActive = activeIdx === idx;

            return <CSSTransition key={id + "-blurb"}
                                      in={isActive && animateIn}
                                      classNames="fadeup"
                                      timeout={transition.normal}
                                      unmountOnExit>
                      <BlurbText>
                        <QuoteIcon>
                          <FontAwesomeIcon icon={faQuoteLeft} />
                        </QuoteIcon>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                      </BlurbText>
                  </CSSTransition>
          })}
        </BlurbContainer>

        <CiteContainer>
          {data.allMarkdownRemark.edges.map((edge, idx) => {
            const {id, html, frontmatter} = edge.node;
            const { image, author } = frontmatter;

            const isActive = activeIdx === idx;

            return <CiteProfile key={id} >
                <CiteImage style={{filter: isActive ? "grayscale(0%)" : null}}>
                  <Img style={{ height: "100%", width: "100%" }}
                                imgStyle={{ objectFit: "contain" }}
                                fluid={image.childImageSharp.fluid} />
                </CiteImage>
                <p>{author}</p>
            </CiteProfile>
          })}
        </CiteContainer>
        
      </SectionBlurbs>
	)
}

export default Blurbs