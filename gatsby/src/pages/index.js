import HomeHero from "../components/HomeHero"
import HomeQuote from "../components/HomeQuote"
import Layout from "../components/Layout"
import React from "react"
import Seo from "../components/Seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Welcome" />
    <HomeHero />
    <HomeQuote />
  </Layout>
)

export default IndexPage
