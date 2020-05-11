import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 6fr 2fr 1fr 1fr;
  p {
    border: 1px solid black;
    text-align: center;
  }
`;

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    fetch('/recipes', {
      method: 'get'
    })
    .then(result => result.json())
    .then(data => setRecipes(data.data));
  }, [])

  return (
    <Wrapper>
      <h1>RECIPES</h1>
      <ul>
        <Row>
          <p>Recipe</p>
          <p>Published</p>
          <p></p>
          <p></p>
        </Row>
        {recipes.map(recipe => (
          <Row key={recipe.title}>
            <p className="title">{recipe.title}</p>
            <p>?</p>
            <p>Edit</p>
            <p>Delete</p>
          </Row>
        ))}
      </ul>

    </Wrapper>

  )
}

export default Recipes;