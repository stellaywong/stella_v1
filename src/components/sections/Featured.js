import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import ScrollReveal from 'scrollreveal';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { transitionTimer } from '@utils/util'



const SectionFeatured = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 750px;
  height: 100vh;
  background: #fdf0e6;
  padding: 2.5rem 0;
  overflow: hidden;
  box-sizing: border-box;
`

const Header = styled.h1`
  text-align: center;
`

const HighlightContainer = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  justify-content: center;
  align-items: center;
  width: 1500px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
`

const HighlightTitles = styled.div`
  position: relative;

  h3 {
    color: #666;
    transition: color ${transitionTimer}ms ease-in;

    &.active {
      color: #000;
    }
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
  height: 600px;
  position: relative;
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
      }, transitionTimer);
    }, 3000);
	}, [activeIdx]);


	return (
    <SectionFeatured>
      <Header>Featured In</Header>
      <HighlightContainer>
        <HighlightCovers>
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
                    <CoverImage>
                        <Img style={{ height: "100%", width: "100%" }}
                            imgStyle={{ objectFit: "contain" }}
                            fluid={featuredImage.childImageSharp.fluid} />
                    </CoverImage>
                  </CSSTransition>
          })}
        </HighlightCovers>
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