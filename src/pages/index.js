import React, { useEffect } from "react"
import { Layout, Hero, Featured, Blurbs } from '@components'
import Books from './books.js'
import '../styles/styles.scss'


const IndexPage = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Books />
  )
}

export default IndexPage