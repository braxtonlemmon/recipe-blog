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
  Switch,
  Route,
} from 'react-router-dom';

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRecipeNew, setShowRecipeNew] = useState(false);
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setCurrentUser(name);
  }

  const handleClick = () => {
    fetch('/protected', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  const handleOther = () => {
    fetch('/unprotected', {
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }
  
  return (
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <Header 
        isLoggedIn={isLoggedIn}
      />
      <button onClick={handleClick}>Test</button>
      <button onClick={handleOther}>Again</button>
      <Main>
        <p>Logged in as: {currentUser ? currentUser : 'No one'}</p>
          <Switch>
            <Route path="/login">
              <LoginFormContainer 
                handleLogin={handleLogin}
              />
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
