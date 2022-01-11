import { Link } from "gatsby"
import Logo from "../images/hand-open.svg"
import React from "react"
import { useMainMenuQuery } from "../hooks/queries/useMainMenuQuery"
import { useSlugify } from "../hooks/useSlugify"

const OverlayMenu = ({ menuOpen, callback }) => {
  const { wpMenu: menu } = useMainMenuQuery()
  const slugify = useSlugify()

  return (
    <div
      className={menuOpen ? "overlay-menu overlay-menu-open" : "overlay-menu"}
    >
      <img src={Logo} alt="white-logo" width={50} />
      <ul>
        {menu.menuItems.nodes.map(item =>
          !item.parentId ? (
            <li key={item.id}>
              <Link
                to={item.label === "Home" ? "/" : `/${slugify(item.label)}/`}
                activeClassName="overlay-active"
              >
                {item.label}
              </Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  )
}

export default OverlayMenu
