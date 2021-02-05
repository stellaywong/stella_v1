import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { srConfig } from '@config'
import ScrollReveal from 'scrollreveal';



const StyledFeatured = styled.div`
    margin: 5rem 0;
`

const Title = styled.h2`
	font-size: 1.6rem;
	text-align: center;
`

const CardGrid = styled.div`
	display: grid;
	gap: 20px;
	grid-template-columns: 1fr;

	@media (min-width: ${(({theme}) => theme.structure.tabletM)}px) {
        grid-template-columns: 1fr 1fr;
	}
	
	@media (min-width: ${(({theme}) => theme.structure.desktopS)}px) {
        gap: 2rem;
    }
`


const Card = styled.div`
	position: relative;
	border: 1px solid #c6c7c1;
	margin-bottom: 2rem;
	box-shadow: 2px 2px 2px #010101;
	visibility: hidden;

	.gatsby-image-wrapper {
		width: 100%;
		height: 300px;
		border-bottom: 1px solid #c6c7c1;
	}

	.text-area {
		padding: 1rem;
		text-align: ${({even}) => even ? "left" : "right"};
		background-color: #f2f2f2;
	}

	h4 {
		color: var(--color-secondary);
		margin-bottom: 0.5rem;
	}

	p {
		margin-bottom: 0.5rem;
	}

	a {
		color: var(--color-coral);
		font-size: 16px;
	}

	@media (min-width: ${(({theme}) => theme.structure.tabletS)}px) {
        .gatsby-image-wrapper {
			height: 400px;
		}
	}

	@media (min-width: ${(({theme}) => theme.structure.desktopS)}px) {
		.gatsby-image-wrapper {
			height: 400px;
		}
	}
	


`




const Featured = (props) => {

	const data = useStaticQuery(graphql`
		query {
			allMarkdownRemark (
				filter: {
					frontmatter: {
						featured: {
							eq: true
						}
					}
				}
			) {
			edges {
				node {
					frontmatter {
						title
						publisher
						external_link
						featuredImage {
								childImageSharp {
									fluid(maxWidth: 800, quality: 90) {
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

	const titleRef = useRef(null);
	const featuredRef = useRef([]);

	useEffect(() => {
		ScrollReveal().reveal(titleRef.current, srConfig());
		featuredRef.current.forEach((ref, i) => ScrollReveal().reveal(ref, srConfig((i + 1) * 300)));
	}, []);

	return (
			<StyledFeatured id="featured">
					<Title ref={titleRef}>
						Featured Work
					</Title>

				<CardGrid>
					{data.allMarkdownRemark.edges.map((edge, idx) => {
						const {title, publisher, external_link, featuredImage} = edge.node.frontmatter;
						const even = idx % 2 === 0;
						
						return (

								<Card even={even}
										ref={el => featuredRef.current[idx] = el}>
									<Img fluid={featuredImage.childImageSharp.fluid} />
									<div className="text-area">
										<h4 className="featured-title">{publisher}</h4>
										<p>{title}</p>

										<a href={external_link}>
												<FontAwesomeIcon icon={faExternalLinkAlt} />
										</a>

									</div>
								</Card>
						)
					})}
				</CardGrid>
			</StyledFeatured>
	)
}



export default Featured