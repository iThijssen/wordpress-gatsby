import { graphql, useStaticQuery } from "gatsby"

export const useHomeQuoteQuery = () => {
  const data = useStaticQuery(graphql`
    query HomeQuoteQuery {
      wpPage(databaseId: { eq: 52 }) {
        id
        content
        quote {
          quelle
          zitat
        }
      }
    }
  `)
  return data
}
