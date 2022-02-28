import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { Layout } from '@components'



const Events = (props) => {
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
              eq: "events"
            }
          }
        }
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              date
            }
          }
        }
      }
    }`)

  return <Layout>
          <div className="card-stack">
            {query.allMarkdownRemark.edges.map((edge, i) => {
              const { id, html } = edge.node;
              const { date } = edge.node.frontmatter;
              
              const f_date = new Date(date);
              const s_date = f_date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: "utc" });

              return <div key={id} className="card">
                        <div className="card-header">
                          <h2>{s_date}</h2>
                        </div>
                        <div className="card-info" dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
            })}
          </div>
        </Layout>
}


export default Events