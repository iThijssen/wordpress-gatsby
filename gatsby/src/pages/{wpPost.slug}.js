import { Container } from "react-bootstrap"
import Layout from "../components/Layout"
import React from "react"
import Seo from "../components/Seo"
import { graphql } from "gatsby"

const PostTemplate = ({ data }) => (
  <Layout>
    <Seo title={data.wpPost.title} />
    <Container>
      <h1 dangerouslySetInnerHTML={{ __html: data.wpPost.title }} />
      <div dangerouslySetInnerHTML={{ __html: data.wpPost.content }} />
    </Container>
  </Layout>
)

export default PostTemplate

export const postQuery = graphql`
  query ($id: String!) {
    wpPost(id: { eq: $id }) {
      id
      title
      content
      slug
    }
  }
`
