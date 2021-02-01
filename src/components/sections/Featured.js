import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const StyledFeatured = styled.div`
    margin: 5rem 0;

`


const FeaturedTitle = styled.h2`
    display: flex;
    align-items: center;

    &:after {
        content: '';
        display: block;
        position: relative;
        width: 100px;
        height: 1px;
        margin-left: 20px;
        background-color: var(--color-gray);
    }
`


const FeaturedContent = styled.div`
		position: relative;
		border: 1px solid #c6c7c1;
		margin-bottom: 2rem;

		.gatsby-image-wrapper {
			width: 100%;
			height: 300px;
			border-bottom: 1px solid #c6c7c1;
		}

		
`

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	${({even}) => even ? "right: 1rem;" : "left: 1rem;"}
	bottom: 1rem;
	text-align: ${({even}) => even ? "right" : "left"};

	h3 {
		color: var(--color-secondary);
		margin: 0;
	}

	p {
		margin: 0;
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

	return (
			<StyledFeatured id="featured">
					{/* <FeaturedTitle>
							Some of my work
					</FeaturedTitle> */}

					{data.allMarkdownRemark.edges.map((edge, idx) => {
						const {title, publisher, external_link, featuredImage} = edge.node.frontmatter;
						const even = idx % 2 === 0;
						
						return (
							<FeaturedContent>
								<Img fluid={featuredImage.childImageSharp.fluid} />
								<TextBox even={even}>
									<h3 className="featured-title">{publisher}</h3>
									<p>{title}</p>

									<a href="#featured">
											<FontAwesomeIcon icon={faExternalLinkAlt} />
									</a>

								</TextBox>
							</FeaturedContent>
						)
					})}

			</StyledFeatured>
	)
}



export default Featured