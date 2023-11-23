import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';




const Music = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: {
          fields: frontmatter___date, 
          order: DESC
        },
        filter: {
          fields: {
            category: {
              eq: "music"
            }
          }
        }
      ) {
        edges {
          node {
            frontmatter {
              title
              audio_url
              description
            }
          }
        }
      }
    }
  `)
    
    return <Layout>
        <div className="card-stack">
          {data.allMarkdownRemark.edges.map((edge, idx) => {
            const { id, frontmatter } = edge.node;
            const { title, audio_url, description } = frontmatter;

            return <div key={id} className="card">
                    <div className="card-info">
                      <h3 className="card-title">
                        {title}
                      </h3>
                      <p>
                        {description}
                      </p>
                    </div>
                    <AudioPlayer src={require(`@mp3s/${audio_url}`)} />
                  </div>
          })}
        </div>
    </Layout>
}

export default Music