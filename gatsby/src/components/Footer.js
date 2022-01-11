import Navigation from "./Navigation"
import React from "react"
import { useLegalMenuQuery } from "../hooks/queries/useLegalMenuQuery"

const Footer = () => {
  const footerData = useLegalMenuQuery()

  return (
    <footer>
      <Navigation menu={footerData.wpMenu.menuItems.nodes} />
    </footer>
  )
}

export default Footer
