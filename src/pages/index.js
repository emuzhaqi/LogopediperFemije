import * as React from "react"
import Layout from "../components/Layout"

const IndexPage = () => {
  return (
    <Layout>
      <div className="hero">
        <h1>Welcome to LogopediperFemije</h1>
        <p>
          This is a Gatsby-powered React application, ready for development and
          automatically deployed to GitHub Pages.
        </p>
      </div>

      <section className="content">
        <h2>Getting Started</h2>
        <p>
          Edit <code>src/pages/index.js</code> to update this page.
        </p>

        <div className="features">
          <div className="feature">
            <h3>⚡ Fast Development</h3>
            <p>Hot reloading for rapid iteration</p>
          </div>

          <div className="feature">
            <h3>🚀 Auto Deploy</h3>
            <p>GitHub Actions handles deployment</p>
          </div>

          <div className="feature">
            <h3>⚛️ React + Gatsby</h3>
            <p>Modern stack for building web apps</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Home | LogopediperFemije</title>
    <meta name="description" content="Welcome to LogopediperFemije" />
  </>
)
