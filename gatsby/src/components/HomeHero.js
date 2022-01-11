import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { getImage } from "gatsby-plugin-image"
import { useHeroQuery } from "../hooks/queries/useHeroQuery"

const HomeHero = () => {
  const { wpPage } = useHeroQuery()

  return (
    <div className="home-hero">
      <GatsbyImage
        image={
          wpPage.hero.heroImage
            ? getImage(wpPage.hero.heroImage.localFile)
            : "../images/hand-open.svg"
        }
        alt="hero-image"
      />
      <h1>{wpPage.hero.heroText}</h1>
    </div>
  )
}

export default HomeHero
