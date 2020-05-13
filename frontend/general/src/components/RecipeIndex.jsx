import React, { useState, useEffect }from 'react';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  justify-content: center;
  gap: 10px;
  width: 90%;
`;

function Index() {
  const [recipes, setRecipes] = useState([]);
  const [recipesLoaded, setRecipesLoaded] = useState(false);

  useEffect(() => {
    fetch('/recipes')
    .then(result => result.json())
    .then(data => setRecipes(data.data))
    .then(() => setRecipesLoaded(true))
  }, []);
  
  if (recipesLoaded) {
     return (
        <Wrapper>
          {recipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`}>
              <li key={recipe.title}>
                <RecipeCard recipe={recipe} key={recipe.title} />
              </li>
            </Link>
          ))}
        </Wrapper>
      );
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default Index;