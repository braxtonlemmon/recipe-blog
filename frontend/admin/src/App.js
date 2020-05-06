import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import GlobalStyle from './GlobalStyle';
import LoginFormContainer from './components/LoginFormContainer';
import Recipes from './components/Recipes';
import RecipeFormContainer from './components/RecipeFormContainer';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {
  const [apiResponse, setApiResponse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRecipeNew, setShowRecipeNew] = useState(false);
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const callAPI = () => {
    fetch('/recipes')
    .then(res => res.text())
    .then(res => setApiResponse(res))
  }

  useEffect(() => {
    callAPI();
  });

  const Wrapper = styled.div`
    display: flex;
  `;

  const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  `;

  return (
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <Header 
        isLoggedIn={isLoggedIn}
      />
      <Main>
        <p>Logged in as: {currentUser ? currentUser : 'No one'}</p>
          <Switch>
            <Route path="/login">
              <LoginFormContainer />
            </Route>
            <Route path="/recipes">
              <Recipes />
            </Route>
            <Route path="/new">
              <RecipeFormContainer />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>


      </Main>
    </Wrapper>
  );
}

export default App;
