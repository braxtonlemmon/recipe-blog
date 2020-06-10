require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `recipe blog`,
    description: `A blog with all my recipes`,
    author: `Braxton Lemmon`,
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
      resolve: '@robinmetral/gatsby-source-s3',
      options: {
        aws: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION,
        },
        buckets: ['remember-to-cook'],
      }
    },
    {
      resolve: "gatsby-source-mongodb",
      options: {
        dbName: "test",
        collection: "recipes",
        server: {
          address: "cluster0-shard-00-00-hhm0q.mongodb.net",
          port: 27017,
        },
        auth: {
          user: process.env.GATSBY_MONGO_USERNAME,
          password: process.env.GATSBY_MONGO_PASSWORD,
        },
        extraParams: {
          replicaSet: "cluster0-shard-0",
          ssl: true,
          authSource: "admin",
          retryWrites: true,
        },
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
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Special Elite',
          'Josefin Sans'
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-styled-components",
    `gatsby-transformer-sharp`,
  ],
}
