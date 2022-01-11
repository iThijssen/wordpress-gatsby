import { graphql, useStaticQuery } from "gatsby"

export const useMainMenuQuery = () => {
  const headerData = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
      wpMenu(name: { eq: "mainMenu" }) {
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
  return headerData
}
