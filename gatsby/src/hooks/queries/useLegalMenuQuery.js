import { graphql, useStaticQuery } from "gatsby"

export const useLegalMenuQuery = () => {
  const footerData = useStaticQuery(graphql`
    query FooterQuery {
      wpMenu(name: { eq: "legalMenu" }) {
        menuItems {
          nodes {
            id
            label
            parentId
            url
            childItems {
              nodes {
                id
                label
                title
                url
              }
            }
          }
        }
      }
    }
  `)
  return footerData
}
