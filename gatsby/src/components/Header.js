import { Link } from "gatsby"
import Logo from "../images/hand-open.svg"
import Navigation from "./Navigation"
import React from "react"
import { useMainMenuQuery } from "../hooks/queries/useMainMenuQuery"

const Header = () => {
  const headerData = useMainMenuQuery()

  return (
    <header>
      <Link to="/" className="home-logo">
        <img src={Logo} alt={headerData.site.siteMetadata.title} width={50} />
      </Link>
      <Navigation menu={headerData.wpMenu.menuItems.nodes} />
    </header>
  )
}

export default Header
