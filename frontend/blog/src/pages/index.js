import React from 'react';
import styled from 'styled-components';
// import RecipeCard from './RecipeCard';
import { Link, graphql } from 'gatsby';
import RecipeCard from '../components/RecipeCard';

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 260px);
  gap: 10px;
  width: 90%;
  li {
    margin: 15px;
  }
`;

function IndexPage(props) {
  const recipes = props.data.allMongodbTestRecipes.edges;

  return (
    <Wrapper>
      {recipes.map((recipe) => (
        <Link key={recipe.node.id} to='#'>
          <li key={`list~${recipe.node.id}`}>
            <RecipeCard recipe={recipe.node} key={`card~${recipe.id}`} />
          </li>
        </Link>
      ))}
    </Wrapper>
  )
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMongodbTestRecipes {
      edges {
        node {
          title
          created
          quote
          steps
          is_published
          intro
          image
          id
        }
      }
    }
  }
`