import React from 'react';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';

const Wrapper = styled.div`
  display: grid;
`;

function Index(props) {

  
  return (
    <Wrapper>
      <div>
        <ul>
          {props.recipes.map((recipe) => (
            <li key={recipe.title} onClick={() => props.handleRecipeClick(recipe._id)}>
              <RecipeCard recipe={recipe} key={recipe.title} />
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default Index;