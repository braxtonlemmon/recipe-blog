import React from 'react';
import { graphql } from 'gatsby';

function RecipePage({ data }) {
  const recipe = data.mongodbTestRecipes;

  return (
    <div>
      <p>{recipe.title}</p>
      <p>{recipe.id}</p>
    </div>
  )
}

export default RecipePage;

export const pageQuery = graphql`
  query($id: String!) {
    mongodbTestRecipes(id: { eq: $id }) {
      id
      title
      image
      ingredients
      intro
      steps
    }
  }
`;