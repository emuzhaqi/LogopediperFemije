/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `Logopedi për Fëmijë`,
    description: `Terapi e të folurit për fëmijë me Eva Alimeri — logopede e licencuar. Shërbime konsultimi në person dhe online.`,
    author: `Eva Alimeri`,
    siteUrl: `https://www.logopediperfemije.com`,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Logopedi për Fëmijë`,
        short_name: `LogopediperFemije`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#3498db`,
        display: `minimal-ui`,
        icon: `src/images/favicon-preview.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-143CD02L7M`],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
}
