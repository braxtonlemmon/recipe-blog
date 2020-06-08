const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      recipes: allMongodbTestRecipes {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  const pageTemplate = path.resolve('./src/components/RecipePage.jsx');

  for (const { node } of data.recipes.edges) {
    createPage({
      path: `/recipe/${node.id}/`,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  }
}