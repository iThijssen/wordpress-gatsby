import React from "react"

const Hamburger = ({ handleOverlayMenu }) => (
  <div className="hamburger">
    <label htmlFor="check">
      <input type="checkbox" id="check" onClick={handleOverlayMenu} />
      {new Array(3).fill("").map((element, i) => (
        <span key={i}></span>
      ))}
    </label>
  </div>
)

export default Hamburger
