import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import RecipeCard from './RecipeCard';
import { Link } from 'gatsby';

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

function IndexPage() {
  const [recipes, setRecipes] = useState([]);

  return (
    <Wrapper>
      <h1>Recipes</h1>
    </Wrapper>
  )
}

export default IndexPage;
