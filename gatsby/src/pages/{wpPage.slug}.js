import { Container } from "react-bootstrap"
import Layout from "../components/Layout"
import PageHero from "../components/PageHero"
import React from "react"
import Seo from "../components/Seo"
import { graphql } from "gatsby"

const PageTemplate = ({ data }) => (
  <Layout>
    <Seo title={data.wpPage.title} />
    <Container>
      {data.wpPage.featuredImage ? (
        <PageHero
          img={
            data.wpPage.featuredImage.node.localFile.childImageSharp
              .gatsbyImageData
          }
        />
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: data.wpPage.content }} />
    </Container>
  </Layout>
)

export default PageTemplate

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      content
      status
      slug
      featuredImage {
        node {
          id
          localFile {
            childImageSharp {
              gatsbyImageData(width: 1920, placeholder: TRACED_SVG)
            }
          }
        }
      }
      wpChildren {
        nodes {
          id
          ... on WpPage {
            id
            uri
            slug
            title
          }
        }
      }
      wpParent {
        node {
          ... on WpPage {
            id
            uri
            slug
            title
            wpChildren {
              nodes {
                ... on WpPage {
                  id
                  uri
                  slug
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`
