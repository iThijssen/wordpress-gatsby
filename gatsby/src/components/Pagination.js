import { Link } from "gatsby"
import React from "react"

const Pagination = ({ catUri, page, totalPages }) => (
  <div className="pagination">
    <span>
      <Link
        to={`/${catUri}/${page === 2 ? "" : page - 1 + "/"}`}
        style={{ visibility: page > 1 ? "visible" : "hidden" }}
      >
        <span className="left-arrow">{"<"}</span>
      </Link>
      Page {page} / {totalPages}
      <Link
        to={`/${catUri}/${page + 1}/`}
        style={{ visibility: page < totalPages ? "visible" : "hidden" }}
      >
        <span className="right-arrow">{">"}</span>
      </Link>
    </span>
  </div>
)

export default Pagination
