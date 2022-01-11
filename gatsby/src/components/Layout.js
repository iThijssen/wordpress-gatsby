import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/base.css"
import "../styles/nav.css"

import Footer from "./Footer"
import Hamburger from "./Hamburger"
import Header from "./Header"
import OverlayMenu from "./OverlayMenu"
import React from "react"

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const handleOverlayMenu = () => setMenuOpen(prev => !prev)

  return (
    <>
      <Hamburger handleOverlayMenu={handleOverlayMenu} />
      <OverlayMenu menuOpen={menuOpen} callback={handleOverlayMenu} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
