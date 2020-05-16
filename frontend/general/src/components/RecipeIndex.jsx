import React, { useState, useEffect }from 'react';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';

const Wrapper = styled.ul`
  /* display: grid; */
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, 260px);
  justify-content: center;
  gap: 10px;
  width: 90%;
  li {
    margin: 15px;
  }
`;

function Index() {
  const [recipes, setRecipes] = useState([]);
  const [recipesLoaded, setRecipesLoaded] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    fetch('/recipes', { signal: abortController.signal })
    .then(result => result.json())
    .then(data => setRecipes(data.data))
    .then(() => setRecipesLoaded(true))
    .catch(err => console.error('Request failed', err));

    return () => abortController.abort();
  }, []);
  
  if (recipesLoaded) {
     return (
        <Wrapper>
          {recipes.map((recipe) => (
            <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
              <li key={`list~${recipe._id}`}>
                <RecipeCard recipe={recipe} key={`card~${recipe._id}`} />
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