import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import image1 from '@images/music_images/guzheng.jpeg';
import image2 from '@images/music_images/piano.jpeg';


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

            return <div key={id} className="card card-h">
                    <div className="card-info">
                      <h3 className="card-title">
                        {title}
                      </h3>
                      <p>
                        {description}
                      </p>
                      <AudioPlayer src={require(`@mp3s/${audio_url}`)} />
                    </div>
                  </div>
          })}

          <img src={image1} alt="" style={{ width: "100%", maxWidth: 600, alignSelf: "center" }} />
          <img src={image2} alt="" style={{ width: "100%", maxWidth: 600, alignSelf: "center" }} />
        </div>

        
    </Layout>
}

export default Music