import * as React from "react"

const IndexPage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <h1>Welcome</h1>
    </div>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>LogopediperFemije</title>
    <meta name="description" content="Welcome to LogopediperFemije" />
  </>
)
