/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/LogopediperFemije",
  siteMetadata: {
    title: `LogopediperFemije`,
    description: `A Gatsby-based React application for LogopediperFemije`,
    author: `@emuzhaqi`,
    siteUrl: `https://emuzhaqi.github.io/LogopediperFemije`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
