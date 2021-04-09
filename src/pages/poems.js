import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout } from '@components'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { transitionTimer } from '@utils/util'


const StyledContainer = styled.div`
    padding: 5rem 0;
    min-height: 100vh;

`

const StyledCategories = styled.div`
    text-align: center;
    margin: 2rem 0;

    button {
        margin: 0.5rem;
        background-color: transparent;
        padding: 5px 10px;
        border: 2px solid var(--color-black);
        cursor: pointer;

        &.category-active,
        &:hover {
            color: #f2f2f2;
            background-color: var(--color-black);
        }
    }
`

const StyledDivider = styled.div`
    height: 2px;
    width: 20%;
    margin: 2rem auto;
    background-color: var(--color-black);
`

const StyledContent = styled.div`
    text-align: center;

    .work-item {
        margin: 2em 0;
    }

    a,
    h5 {
        display: inline-block;
        font-size: 1.4rem;
        font-weight: 700;
        font-family: var(--font-sub);
        color: var(--color-secondary);
        margin-bottom: 0;
    }

    p {
        font-size: 1rem;
        margin-bottom: 0.25rem;
    }

    .forthcoming {
        font-size: 0.75rem;
        font-style: italic;
        color: var(--color-gray);
    }
`

const WorkPage = (props) => {
    const [isMounted, setIsMounted] = useState(false);
    const [animateIn, setAnimateIn] = useState(true);
    const [category, setCategory] = useState("poetry");
    const [data, setData] = useState({});

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
                eq: "poem"
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
                external_link
                forthcoming
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
      }`)

      console.log(query);
    
    return (
        <Layout>
            Test
        </Layout>
    )
}

export default WorkPage