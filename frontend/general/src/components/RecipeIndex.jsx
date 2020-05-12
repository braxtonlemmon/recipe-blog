import React from 'react';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  justify-content: center;
  gap: 10px;
  width: 90%;

`;

function Index(props) {

  
  return (
    <Wrapper>
        {/* <ul> */}
          {props.recipes.map((recipe) => (
            <li key={recipe.title} onClick={() => props.handleRecipeClick(recipe._id)}>
              <RecipeCard recipe={recipe} key={recipe.title} />
            </li>
          ))}
        {/* </ul> */}
    </Wrapper>
  );
}

export default Index;