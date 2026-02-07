import * as React from "react"

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <nav>
          <h1 className="site-title">LogopediperFemije</h1>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>
          © {new Date().getFullYear()} LogopediperFemije. Built with{" "}
          <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer">
            Gatsby
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Layout
