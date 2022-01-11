import { Link } from "gatsby"
import React from "react"
import { useSlugify } from "../hooks/useSlugify"

const Navigation = ({ menu }) => {
  const slugify = useSlugify()

  return (
    <nav>
      <ul>
        {menu.map(mainItem =>
          !mainItem.parentId ? (
            <li key={mainItem.id}>
              <Link
                to={
                  mainItem.label === "Home"
                    ? "/"
                    : `/${slugify(mainItem.label)}/`
                }
                activeClassName="nav-active"
              >
                {mainItem.label}
                {mainItem.childItems.nodes.length !== 0 && (
                  <span className="down-arrow">&#709;</span>
                )}
              </Link>
              {mainItem.childItems.nodes.length !== 0 ? (
                <ul>
                  {mainItem.childItems.nodes.map(childItem => (
                    <li key={childItem.id}>
                      <Link
                        to={`/${slugify(childItem.label)}/`}
                        activeClassName="nav-active"
                      >
                        {childItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ) : null
        )}
      </ul>
    </nav>
  )
}

export default Navigation
