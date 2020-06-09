require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `recipe blog`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: "gatsby-source-mongodb",
      options: {
        dbName: "test",
        collection: "recipes",
        server: {
          address: "cluster0-shard-00-00-hhm0q.mongodb.net",
          port: 27017
        },
        auth: {
          user: process.env.GATSBY_MONGO_USERNAME,
          password: process.env.GATSBY_MONGO_PASSWORD,
        },
        extraParams: {
          replicaSet: 'cluster0-shard-0',
          ssl: true,
          authSource: 'admin',
          retryWrites: true
        }
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-styled-components",
    `gatsby-transformer-sharp`,
  ],
}