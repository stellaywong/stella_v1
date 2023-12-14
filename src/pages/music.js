import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Img from 'gatsby-image'




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
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
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
            const { title, audio_url, description, featuredImage } = frontmatter;

            return <div key={id} className="card card-h">
                    {featuredImage &&
                    <div className="card-featured">
                      <Img style={{ width: 300, height: 300, margin: "0 auto" }} fluid={featuredImage.childImageSharp.fluid} /> 
                    </div> }

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
        </div>
    </Layout>
}

export default Music