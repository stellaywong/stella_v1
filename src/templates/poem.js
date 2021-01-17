import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '@components'

export const query = graphql`
    query($slug: String!) {
        markdownRemark(
            fields: {
                slug: {
                    eq: $slug
            }
        }) {
            frontmatter {
                date
                title
            }
            html
        }
    }
`


const Post = (props) => {
    console.log(props);

    const { title, date } = props.data.markdownRemark.frontmatter;
    const { html } = props.data.markdownRemark;

    return (
        <Layout>
            <h1>{title}</h1>
            <p>{date}</p>
            <div dangerouslySetInnerHTML={{__html: html}} />
        </Layout>
    )
}



export default Post