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
              title
              external_link
            }
          }
        }
      }
    }`)

  const renderTitle = (title, external_link) => {
    if (!title) {
      return null;
    }

    return <h3 className="card-title">
      {external_link 
        ? <a href={external_link} target="_blank">{ title }</a>
        : { title } }
    </h3>
  }

  return <Layout>
          <div className="card-stack">
            {query.allMarkdownRemark.edges.map((edge, i) => {
              const { id, html } = edge.node;
              const { date, title, external_link } = edge.node.frontmatter;
              
              const f_date = new Date(date);
              const s_date = f_date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: "utc" });

              return <div key={id} className="card">
                        <h2 className="card-date">
                          {s_date}
                        </h2>
                        <div className="card-info">
                          {renderTitle(title, external_link)}
                          <div dangerouslySetInnerHTML={{ __html: html }} />
                        </div>
                    </div>
            })}
          </div>
        </Layout>
}


export default Events