import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import { transition } from '@utils/util'

 const SectionBlurbs = styled.section`
  ${p => p.theme.mixins.fullWidth};
  position: relative;
  background: #f2f2f2;
  padding: 2rem 0;
 `

 const SectionBlurbsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  padding: 1rem 0;
 `

 const BlurbContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
 `

 const BlurbText = styled.div`
  padding: 1rem;
  border: 1px solid white;
  border-radius: 10px;
  position: relative;
  background: #f7f7fa;
  // box-shadow: inset -2px -2px 3px hsl(0deg 0% 0% / 20%), inset 2px 2px 4px hsl(0deg 0% 20%);
  box-shadow: inset -2px -2px 3px hsl(0deg 0% 70%), inset 2px 2px 4px hsl(0deg 0% 20%);

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
  border-radius: 50px;
  background: #f7f7fa;
  box-shadow: 2px 2px 4px hsl(0deg 0% 20%);


  &:after {
    content: '';
    float:left;
    width: auto;
    padding-bottom: 100%;
  }
`

 const CiteContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  justify-content: space-around;
  align-items: center;
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

 const CiteImage = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: grayscale(100%);
  padding: 0;
  border: none;
  outline: none;
  overflow:hidden;
  cursor: pointer;

  &:hover,
  &.active {
    filter: grayscale(0%);
  }
 `

 const Header = styled.h1`
  position: absolute;
  font-size: clamp(2rem, 2.5vw, 5rem);
  font-family: 'Lato';
  padding: 1rem 3rem;
  left: 0;
  width: 100%;
  text-align: left;
  color: #fff;
  background: linear-gradient(to left, transparent 60%, #009c87);
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
  const [animate, setAnimate] = useState(true);
  const titleRef = useRef(null);

  const handleChange = (idx) => {
    const newIdx = idx || idx === 0 ? idx : (activeIdx + 1) % data.allMarkdownRemark.edges.length;
    setAnimate(false);
    setTimeout(() => {
      setActiveIdx(newIdx);
      setAnimate(true);
    }, transition.normal)
  }

	return (
			<SectionBlurbs>
        <Header ref={titleRef}>
          Blurbs
        </Header>
        <SectionBlurbsWrapper>
          <BlurbContainer>
            {data.allMarkdownRemark.edges.map((edge, idx) => {
              const {id, html} = edge.node;
              const isActive = activeIdx === idx;

              return <CSSTransition key={id + "-blurb"}
                                        in={isActive && animate}
                                        classNames="fade"
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
              const {id, frontmatter} = edge.node;
              const { image, author } = frontmatter;
              const isActive = activeIdx === idx;

              return <CiteProfile key={id} >
                  <CiteImage className={isActive ? "active" : null} onClick={() => handleChange(idx)}>
                    <Img style={{ height: "100%", width: "100%" }}
                                  imgStyle={{ objectFit: "contain" }}
                                  fluid={image.childImageSharp.fluid} />
                  </CiteImage>
                  <p>{author}</p>
              </CiteProfile>
            })}
          </CiteContainer>
        </SectionBlurbsWrapper>
      </SectionBlurbs>
	)
}

export default Blurbs