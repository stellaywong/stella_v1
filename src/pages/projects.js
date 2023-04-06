import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'


const Poems = (props) => {
    const query = useStaticQuery(graphql`
      query {
        allMarkdownRemark(
          sort: {
            fields: frontmatter___date
            order: DESC
          },
          filter: {
            fields: {
              category: {
                eq: "projects"
              }
            }
          }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                description
                external_link
                featuredMp4   
              }
            }
          }
        }
      }`)
    
    return (
        <Layout>
          <div className="card-stack">
            {query.allMarkdownRemark.edges.map((edge, i) => {
              const { id } = edge.node;
              const { title, description, external_link, featuredMp4 } = edge.node.frontmatter;

              return <div key={id} className="card">
                        <div className="card-vid">
                          <video width={300} height={300} autoPlay loop muted>
                            <source src={require(`@mp4s/${featuredMp4}`)} type="video/mp4" />
                          </video>
                        </div>


                        <div className="card-info">
                          <h3 className="card-title">
                            <a href={external_link} target="_blank">
                              {title}
                            </a>
                          </h3>
                          <p>
                            {description}
                          </p>
                        </div>
                    </div>
            })}
          </div>
        </Layout>
    )
}

export default Poems