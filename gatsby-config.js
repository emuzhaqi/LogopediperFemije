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
    // gatsby-plugin-manifest commented out until we add a proper icon
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `LogopediperFemije`,
    //     short_name: `LPF`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`,
    //   },
    // },
  ],
}
