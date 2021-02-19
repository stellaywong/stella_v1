import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { srConfig } from '@config'
import ScrollReveal from 'scrollreveal';


const StyledFeatured = styled.div`
    margin: 5rem 0;
`

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
		color: var(--color-coral);
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
				"text-align: left; padding-left: 1.5rem;"
			) : ( 
				"text-align: right; padding-right: 1.5rem;"
			)}

			&:before {
				content: '';
				position: absolute;
				height: 30%;
				width: 10px;
				background-color: var(--color-coral);
				${({even}) => even ? "left: 0;" : "right: 0;"}
			}
		}

		a {
			font-size: 2.5rem;
		}
	}
`



const Featured = (props) => {
	const data = useStaticQuery(graphql`
		query {
			allMarkdownRemark (
				sort: {
					fields: frontmatter___date
					order: DESC
				}
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
					id
					frontmatter {
						title
						publisher
						description
						external_link
						featuredMp4
						featuredImage {
								childImageSharp {
									fluid(maxWidth: 800, quality: 80) {
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
						const { id, frontmatter } = edge.node;
						const { title, publisher, description, external_link, featuredMp4, featuredImage } = frontmatter;
						
						const headClassnames = ["card-head"];
						if(featuredImage) headClassnames.push("card-head-image");

						return (
								<Card key={id}
										even={idx % 2 === 0}
										ref={el => featuredRef.current[idx] = el}>
									
									<div className={headClassnames.join(" ")}>
										{featuredImage && 
										<Img fluid={featuredImage.childImageSharp.fluid} />}

										{featuredMp4 &&
										<video autoPlay loop muted>
											<source src={require(`@mp4s/${featuredMp4}`)} type="video/mp4" />
										</video>}
									</div>

									<div className="card-content">
										{publisher ? (<>
											<div>
												<a href={external_link}>{publisher}</a>
											</div>
												
											{title && 
											<p>{title}</p>}
										</>) : (<>
											<div>
												<a href={external_link}>{title}</a>
											</div>
										</>)}

										{description &&
										<p>{description}</p>}

									</div>
								</Card>
						)
					})}
				</CardGrid>
			</StyledFeatured>
	)
}

export default Featured