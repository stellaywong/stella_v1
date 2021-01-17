import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'


const Poetry = (props) => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC}
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            date
                        }
                        excerpt
                    }
                }
            }
        }
    `)

    return (
        <div>
            POETRY SECTION
            <ul>
                {data.allMarkdownRemark.edges.map((edge) => {
                    const { title, date } = edge.node.frontmatter;
                    const { excerpt } = edge.node;

                    return (
                        <li>
                            <h1>{title}</h1>
                            <p>{date}</p>
                            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Poetry