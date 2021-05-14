import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import ScrollReveal from 'scrollreveal';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { transitionTimer } from '@utils/util'



const SectionFeatured = styled.section`
  ${p => p.theme.mixins.clearfix}
  min-height: 100vh;
  position: relative;
  background: #fdf0e6;
  overflow: hidden;
`

const HighlightContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  width: 1500px;
  margin: 0 auto;
`

const HighlightTitles = styled.div`
  position: relative;
  
  .featured-in {
    display: inline-block;
    font-weight: 600;
    color: white;
    background: black;
    padding: 5px 10px;
    margin-bottom: 10px;
  }

  h3 {
    color: #666;
    transition: color ${transitionTimer}ms ease-in;

    &.active {
      color: #000;
    }
  }
`

const HighlightCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow:hidden;
`

const CardImage = styled.div`
  width: 450px;
  height: 500px;
  overflow: hidden;
  
  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
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
            frontmatter: {
              featured: {
                eq: true
              }
            },
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
  const [animateIn, setAnimateIn] = useState(true);

	useEffect(() => {
    const { edges } = data.allMarkdownRemark;
    const currentIdx = activeIdx;

    if(!animateIn) setAnimateIn(true);

    setTimeout(() => {
      setAnimateIn(false);
      setTimeout(() => {
        setActiveIdx((currentIdx + 1) % data.allMarkdownRemark.edges.length);
      }, transitionTimer+500);
    }, 3500);
	}, [activeIdx]);


	return (
    <SectionFeatured>
      <HighlightContainer>
        <HighlightCards>
          {data.allMarkdownRemark.edges.map((edge, idx, arr) => {
            const { id, frontmatter } = edge.node;
            const { featuredImage } = frontmatter; 
            const isActive = activeIdx === idx;
            
            return <CSSTransition key={id + "-image"}
                               in={isActive && animateIn}
                               appear={true}
                               classNames="fadeleft"
                               timeout={transitionTimer}
                               unmountOnExit>
                    <CardImage idx={idx} activeIdx={activeIdx} size={arr.length}>
                        <Img style={{ height: "100%", width: "100%" }}
                            imgStyle={{ objectFit: "contain" }}
                            fluid={featuredImage.childImageSharp.fluid} />
                    </CardImage>
                  </CSSTransition>
          })}
        </HighlightCards>
        <HighlightTitles>
            {data.allMarkdownRemark.edges.map((edge, idx) => {
              const { id, frontmatter } = edge.node;
              const { publisher } = frontmatter; 
              const isActive = activeIdx === idx;

              return <h3 className={isActive ? "active" : null}>{publisher}</h3>
            })}
        </HighlightTitles>
      </HighlightContainer>
    </SectionFeatured>
			// <StyledFeatured id="featured">
			// 		<Title ref={titleRef}>
			// 			Featured Work
			// 		</Title>

			// 	<CardGrid>
			// 		{data.allMarkdownRemark.edges.map((edge, idx) => {
			// 			const { id, frontmatter } = edge.node;
			// 			const { title, publisher, description, external_link, featuredMp4, featuredImage } = frontmatter;
						
			// 			const headClassnames = ["card-head"];
			// 			if(featuredImage) headClassnames.push("card-head-image");

			// 			return (<Card key={id}
			// 							even={idx % 2 === 0}
			// 							ref={el => featuredRef.current[idx] = el}>
									
			// 						<div className={headClassnames.join(" ")}>
			// 							{featuredImage && 
			// 							<Img fluid={featuredImage.childImageSharp.fluid} />}

			// 							{featuredMp4 &&
			// 							<video autoPlay loop muted>
			// 								<source src={require(`@mp4s/${featuredMp4}`)} type="video/mp4" />
			// 							</video>}
			// 						</div>

			// 						<div className="card-content">
			// 							{publisher ? (<>
			// 								<div>
			// 									<a href={external_link} className="link-effect-underline">{publisher}</a>
			// 								</div>
												
			// 								{title && 
			// 								<p>{title}</p>}
			// 							</>) : (<>
			// 								<div>
			// 									<a href={external_link} className="link-effect-underline">{title}</a>
			// 								</div>
			// 							</>)}

			// 							{description &&
			// 							<p>{description}</p>}

			// 						</div>
			// 					</Card>)
			// 		})}
			// 	</CardGrid>
			// </StyledFeatured>
	)
}

export default Featured