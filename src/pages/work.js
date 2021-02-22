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
        margin-bottom: 0.5rem;
    }

    a {
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
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
            allMarkdownRemark(sort: {
                fields:frontmatter___date
                order:DESC
            }) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            publisher
                            external_link
                            forthcoming
                        }
                        fields {
                            category
                        }
                    }
                }
            }
        }
    `)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 100);

        const queryData = {};
        query.allMarkdownRemark.edges.forEach(edge => {
            const { id, frontmatter, fields } = edge.node;
            const { category } = fields;
        
            if(!queryData[category]) queryData[category] = [];
            queryData[category].push({ id, ...frontmatter, fields });
        })
        setData(queryData);


        return () => {
            clearTimeout(timeout);
        }
    }, [query])

    const handleCategoryChange = (prevCategory, newCategory) => {
        setAnimateIn(false);
        const timeout = (data[prevCategory] || []).length * 100 + transitionTimer;

        setTimeout(() => {
            setAnimateIn(true);
            setCategory(newCategory);
        }, timeout);
    }
    
    return (
        <Layout>
            <StyledContainer>
                <StyledCategories>
                    <TransitionGroup component={null}>
                        {Object.keys(data).map((name, idx, array) => (
                            <CSSTransition key={idx + "-category"}
                                            timeout={array.length * 100 + transitionTimer}
                                            classNames="fadedown">
                                <button key={idx}
                                        style={{ transitionDelay: `${idx + 1}00ms`}}
                                        className={name === category ? "category-active" : "category"}
                                        onClick={() => handleCategoryChange(category, name)}>
                                    {name}
                                </button>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </StyledCategories>

                <StyledDivider />

                <StyledContent>
                        {isMounted &&
                            (data[category] || []).map((item, idx, array) => {
                                const {id, publisher, title, external_link, forthcoming} = item;

                                return (
                                    <div className="work-item" key={id}>
                                        {forthcoming &&
                                        <CSSTransition key={id + "-forthcoming"}
                                                        timeout={array.length * 100 + transitionTimer}
                                                        in={animateIn}
                                                        appear={true}
                                                        unmountOnExit
                                                        classNames="fade">
                                            <p className="forthcoming">forthcoming</p>
                                        </CSSTransition>}

                                        {publisher &&
                                        <CSSTransition key={id + "-publisher"}
                                                        timeout={array.length * 100 + transitionTimer}
                                                        in={animateIn}
                                                        appear={true}
                                                        unmountOnExit
                                                        classNames="fadeleft">
                                            {external_link ? (
                                                <a href={external_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{transitionDelay: `${1 + idx}00ms`}}>
                                                        {publisher}
                                                </a>
                                            ) : (
                                                <h5 style={{transitionDelay: `${1 + idx}00ms`}}>
                                                    {publisher}
                                                </h5>
                                            )}
                                        </CSSTransition>}

                                        {title &&
                                        <CSSTransition key={id + "-title"}
                                                        timeout={array.length * 100 + transitionTimer}
                                                        in={animateIn}
                                                        appear={true}
                                                        unmountOnExit
                                                        classNames="faderight">
                                            {!publisher && external_link ? (
                                                <a href={external_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{transitionDelay: `${1 + idx}00ms`}}>
                                                        {title}
                                                </a>
                                            ) : (
                                                <p style={{transitionDelay: `${1 + idx}00ms`}}>
                                                    {title}</p>
                                            )}
                                        </CSSTransition>}
                                    </div>
                                )
                            })
                        }
                </StyledContent>
            </StyledContainer>
        </Layout>
    )
}

export default WorkPage