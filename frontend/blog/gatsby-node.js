const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

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

// exports.onCreateNode = ({ node }) => {
//     console.log(node.internal.type)
// }

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node.internal.type === 'mongodbTestRecipes' &&
    node.image !== null
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.image,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    })

    if (fileNode) {
      node.mainImage___NODE = fileNode.id
    }
  }
}

