import React, { useEffect } from "react"
import { Layout, Hero, Featured, Blurbs } from '@components'
import styled from 'styled-components'


const StyledIndex = styled.div`
  display: flex;

`


const IndexPage = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Featured />
    </Layout>
  )
}

export default IndexPage