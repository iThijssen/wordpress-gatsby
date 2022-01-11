import { Container } from "react-bootstrap"
import React from "react"
import { useHomeQuoteQuery } from "../hooks/queries/useHomeQuoteQuery"

const Quote = () => {
  const data = useHomeQuoteQuery()

  return (
    <div className="home-content">
      <div className="home-quote">
        <q>{data.wpPage.quote.zitat}</q>
        <p>{data.wpPage.quote.quelle}</p>
      </div>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: data.wpPage.content }} />
      </Container>
    </div>
  )
}

export default Quote
