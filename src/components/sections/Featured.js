import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import { CSSTransition } from 'react-transition-group'
import { transition } from '@utils/util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'


const SectionFeatured = styled.section`
  display: flex;
  ${p => p.theme.mixins.fullWidth};
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  // height: 100vh;
  background: #fdf0e6;
  padding: 2rem 0;
  overflow: hidden;
  box-sizing: border-box;
`

const Header = styled.h1`
  position: absolute;
  font-size: clamp(2rem, 2.5vw, 5rem);
  font-family: 'Lato';
  padding: 1rem 3rem;
  right: 0;
  width: 100%;
  text-align: right;
  color: #fff;
  background: linear-gradient(to right, transparent 60%, #009c87);
`

const HighlightContainer = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  justify-content: center;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
`

const HighlightTitles = styled.div`
  position: relative;
  text-align: center;

  p, a {
    color: #666;
    margin-bottom: 5px;
  }
`

const HighlightCovers = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
  overflow: hidden;
`

const CoverImage = styled.div`
  width: 450px;
  height: 100%;
  position: relative;

  .gatsby-image-wrapper {
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
  }
`

const Bullets = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  margin: 0 auto;
  width: 400px;

  button {
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background: gray;
    border: none;
    box-shadow: inset 1px 1px 1px black;
    outline: none;
    cursor: pointer;

    &:hover,
    &.active {
      background: #009eff;
    }
  }
`

const Featured = (props) => {
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
                image {
                  childImageSharp {
                    fluid(maxWidth: 800, quality: 60) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }`)

  const [activeIdx, setActiveIdx] = useState(0);
  const [animate, setAnimate] = useState(true);
  const titleRef = useRef(null);
  
  useEffect(() => {
      let timeoutAnimate = setTimeout(handleChange, 4000);
      return () => {
        clearTimeout(timeoutAnimate);
      }
  }, [activeIdx])

  const handleChange = (idx) => {
    const newIdx = idx || idx === 0 ? idx : (activeIdx + 1) % data.allMarkdownRemark.edges.length;
    setAnimate(false);
    setTimeout(() => {
      setActiveIdx(newIdx);
      setAnimate(true);
    }, transition.normal)
  }

  const { edges } = data.allMarkdownRemark;
  const { publisher, poems, external_link } = edges[activeIdx].node.frontmatter;

	return (
    <SectionFeatured>
      <Header ref={titleRef}>
        Featured In
      </Header>
      <HighlightContainer>
        <HighlightCovers>
          {data.allMarkdownRemark.edges.map((edge, idx, arr) => {
            const { id, frontmatter } = edge.node;
            const { image } = frontmatter; 
            const isActive = activeIdx === idx;
            
            return <CSSTransition key={id + "-image"}
                                  in={isActive && animate}
                                  appear={true}
                                  classNames="fadeleft"
                                  timeout={transition.normal}
                                  unmountOnExit>
                    <CoverImage>
                        <Img style={{ height: "100%", width: "100%" }}
                             imgStyle={{ objectFit: "contain" }}
                             fluid={image.childImageSharp.fluid} />
                    </CoverImage>
                  </CSSTransition>
          })}
        </HighlightCovers>
        <HighlightTitles>
          <h1>{publisher}</h1>
          {poems.map((poem, idx) => (
            <p key={poem + "-" + idx}>{poem}</p>
          ))}
          <div style={{marginTop:10}}>
            <a href={external_link} target="_blank" title={publisher} rel="noreferrer">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        </HighlightTitles>
      </HighlightContainer>
      <Bullets>
        {data.allMarkdownRemark.edges.map((edge, idx) => {
          return <button className={idx === activeIdx ? "active" : null} aria-label={"select poem #" + idx} onClick={() => handleChange(idx)} />
        })}
      </Bullets>
    </SectionFeatured>
	)
}

export default Featured