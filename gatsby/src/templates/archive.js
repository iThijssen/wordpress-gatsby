import { Link, graphql } from "gatsby"

import { Container } from "react-bootstrap"
import Layout from "../components/Layout"
import Pagination from "../components/Pagination"
import React from "react"
import Seo from "../components/Seo"

const archiveTemplate = ({
  data: { allWpPost },
  pageContext: { catId, catName, catUri, categories, numPages, currentPage },
}) => (
  <Layout>
    <Seo title={catName} />
    <Container>
      <h1 className="mb-5" dangerouslySetInnerHTML={{ __html: catName }} />
      {allWpPost.edges.map(post => (
        <article key={post.node.id}>
          <Link to={`/${post.node.slug}/`}>
            <h2 dangerouslySetInnerHTML={{ __html: post.node.title }} />
          </Link>
          <div dangerouslySetInnerHTML={{ __html: post.node.date }} />
          <span
            dangerouslySetInnerHTML={{
              __html: post.node.excerpt
                .replace(/^<p>/, "")
                .replace(/<\/p>$/gm, ""),
            }}
          />
          <Link to={`/${post.node.slug}/`}>more</Link>
          <hr />
          <br />
        </article>
      ))}
      <Pagination catUri={catUri} page={currentPage} totalPages={numPages} />
    </Container>
  </Layout>
)

export default archiveTemplate

export const pageQUery = graphql`
  query ($catId: String!, $skip: Int!, $limit: Int!) {
    allWpPost(
      sort: { order: DESC, fields: date }
      filter: { categories: { nodes: { elemMatch: { id: { eq: $catId } } } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          title
          excerpt
          uri
          slug
          date(formatString: "DD MM YYYY")
        }
      }
    }
  }
`
