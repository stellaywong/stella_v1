import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import ScrollReveal from 'scrollreveal';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { transitionTimer } from '@utils/util'



const SectionFeatured = styled.section`
  height: 100vh;
  overflow:hidden;
`

const HighlightContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  justify-content: center;
  align-items: center;
  width: 1500px;
  height: 100%;
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

  h1 {
    font-size: 4rem;
  }
`

const HighlightCards = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: calc(70vmin + 5rem);
  user-select: none;
`

const CardImage = styled.div`
  position: absolute;

  z-index: ${p => p.size - p.idx};

  .card-rotate {
    position: relative;  
    width: 450px;
    box-shadow: rgb(0 0 0 / 0%) 2px 5px 27px;
    transition: background 200ms ease-in, transform 200ms ease-in;
    ${p => {
      const index = p.idx - p.activeIdx;
      const degree = 5;
      if(index % 2 === 0) {
        return `transform: rotate(${index % 3 * degree}deg)`;
      } else {
        return `transform: rotate(${index % 3 * -degree}deg)`;
      }
    }}
  }
`

// const CardRotate = styled.div`
//   position: relative;  
//   width: 400px;
//   padding: 10px;
//   background: ${p => p.active ? "#ffeee" : null};
//   box-shadow: rgb(0 0 0 / 0%) 2px 5px 27px;
//   ${p => {
//     const index = p.
//   }
//     p.index % 2 === 0
//             ? `transform: rotate(${p.index % 3 * 5}deg)`
//             : `transform: rotate(${p.index % 3 * -5}deg)`};
// `

const Title = styled.h2`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.6rem;
	text-align: center;

	&:before,
    &:after {
		display: block;
        content: "";
        height: 2px;
        width: 5vw;
        background-color: var(--color-black);
	}
	
	&:before {
		margin-right: 1rem;
	}

	&:after {
		margin-left: 1rem;
	}
`

const CardGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	grid-template-columns: 1fr;

	// @media (min-width: ${(({theme}) => theme.structure.tabletM)}px) {
    //     grid-template-columns: 1fr 1fr;
	// }
	
	// @media (min-width: ${(({theme}) => theme.structure.desktopS)}px) {
    //     gap: 2rem;
    // }
`

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	margin-bottom: 2rem;
	visibility: hidden;
	
	.card-head-image {
		padding-top: 100%; /* 1:1 Aspect Ratio */
	}

	.card-head {
		position:relative;
		box-sizing: border-box;
		line-height: 0;
		width: 100%;

		.gatsby-image-wrapper {
			position: absolute !important;
			overflow: initial !important;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		video {
			width: 100%;
		}
	}

	.card-content {
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		line-height: 1.5;
		width: 100%;
	}

	p {
		margin-bottom: 0.5rem;
	}

	a {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		text-decoration: none;
		color: var(--color-salmon);
		font-family: var(--font-header);
	}

	@media (min-width: ${({theme}) => theme.structure.tabletS}px) {
		.card-head-image {
			padding-top: 75%; /* 1:1 Aspect Ratio */
		}

		.card-head {
			width: 75%;
		}

		.card-content {
			width: 75%;
		}
	}

	@media (min-width: ${({theme}) => theme.structure.tabletM}px) {
		flex-direction: ${({even}) => even ? "row" : "row-reverse"};
		align-items: normal;
		
		.card-head-image {
			padding-top: 50%; /* 1:1 Aspect Ratio */
		}

		.card-head {
			width: 50%;
		}

		.card-content {
			width: 50%;
			${({even}) => even ? (
				"text-align: left; padding-left: 1.75rem;"
			) : ( 
				"text-align: right; padding-right: 1.75rem;"
			)}

			&:before {
				content: '';
				position: absolute;
				height: 30%;
				width: 10px;
				background-color: var(--color-salmon);
				${({even}) => even ? "left: 0;" : "right: 0;"}
			}
		}

		a {
			font-size: 2.25rem;
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
  const [animateIn, setAnimateIn] = useState([]);

  const assignAnimateOut = () => {
    const animateIn = [...animateIn];
    animateIn[activeIdx] = false;
    setAnimateIn(animateIn);
  }

  const assignAnimateIn = (idx=0) => {
    const animateIn = [...animateIn];
    animateIn[idx] = true;
    setAnimateIn(animateIn);
  }

  const incrementActiveIdx = () => {
    const { edges } = data.allMarkdownRemark;
    const newActiveIdx = (activeIdx + 1) % edges.length;
    assignAnimateIn(newActiveIdx);
    setActiveIdx(newActiveIdx);
  }

  useEffect(() => {
    const { edges } = data.allMarkdownRemark;
    const animateIn = Array.from(edges, () => false);
    animateIn[0] = true;
    setAnimateIn(animateIn);
  }, [])

	useEffect(() => {
    const { edges } = data.allMarkdownRemark;
    setTimeout(() => {
      assignAnimateOut();
      setTimeout(incrementActiveIdx, transitionTimer);
    }, 5000);
    // setTimeout(() => setActiveIdx((activeIdx + 1) % edges.length), 3000);

		// ScrollReveal().reveal(titleRef.current, srConfig());
		// featuredRef.current.forEach((ref, i) => ScrollReveal().reveal(ref, srConfig((i + 1) * 300)));
	}, [activeIdx]);

  console.log(activeIdx);

	return (
    <SectionFeatured>
      <HighlightContainer>
        <HighlightTitles>
            <span className="featured-in">Featured In</span>
            {data.allMarkdownRemark.edges.map((edge, idx) => {
              const { id, frontmatter } = edge.node;
              const { publisher } = frontmatter; 
              const animate = animateIn[idx];

              return <CSSTransition key={id + "-title"}
                                    in={animate}
                                    appear={true}
                                    classNames="fade"
                                    timeout={transitionTimer} 
                                    mountOnEnter
                                    unmountOnExit>
                                      <h1>{publisher}</h1>
              </CSSTransition>
            })}
        </HighlightTitles>

        <HighlightCards>
          {/* <TransitionGroup component={null}> */}
          {data.allMarkdownRemark.edges.map((edge, idx, arr) => {
            const { id, frontmatter } = edge.node;
            const { featuredImage } = frontmatter; 

            const show = activeIdx <= idx;
            const isActive = activeIdx === idx;

            
            return (
                <CSSTransition key={id + "-image"}
                               in={show}
                               appear={true}
                               classNames="slideBigRight"
                               timeout={arr.length * transitionTimer + 100}
                               unmountOnExit>
                  <CardImage idx={idx} activeIdx={activeIdx} size={arr.length} style={{ transitionDelay: show ? `${idx + 1}00ms` : null }}>
                    <div className="card-rotate">
                      <Img fluid={featuredImage.childImageSharp.fluid} />
                    </div>
                  </CardImage>
                </CSSTransition>
            )
          })}
          {/* </TransitionGroup> */}
        </HighlightCards>

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