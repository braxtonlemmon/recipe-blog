import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header.jsx';
import Index from './components/RecipeIndex.jsx';
import RecipePage from './components/RecipePage.jsx';

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  margin-top: 3.5em;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 3.5em;
`;

function App() {
  const [showIndex, setShowIndex] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [selectedComments, setSelectedComments] = useState([]);

  const getRecipes = () => {
    fetch('/recipes')
    .then(data => data.json())
    .then(res => {
      setRecipes(res.data);
    })
  }

  const handleRecipeClick = (id) => {
    fetch(`/recipes/${id}`)
    .then(data => data.json())
    .then(res => {
      setSelectedRecipe(res.data);
    })
    .then(() => getComments(id))
    .then(() => {
      setShowIndex(false);
      setShowRecipe(true);
    })
  }

  const getComments = (id) => {
    fetch(`/comments/${id}`)
    .then(data => data.json())
    .then(res => {
      setSelectedComments(res.data);
    })
  }

  const handleClickHome = () => {
    setShowIndex(true);
    setShowRecipe(false);
  }


  useEffect(() => {
    getRecipes();
  }, []);

  
  return (
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <Header handleClickHome={handleClickHome}/>
      <Main>
        { 
          showIndex && 
          <Index 
            recipes={recipes}
            handleRecipeClick={handleRecipeClick} 
          /> 
        }
        { 
          showRecipe &&
          <RecipePage 
            recipe={selectedRecipe} 
            comments={selectedComments}
            getComments={getComments}
          />   
        }
      </Main>
    </Wrapper>
  );
}

export default App;
