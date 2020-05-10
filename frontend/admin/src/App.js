import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Routing from './components/Routing';
import Footer from './components/Footer';

const Wrapper = styled.div`
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 100%;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setCurrentUser(name);
  }
  
  const handleLogout = () => {
    fetch('/auth/logout')
    .then(() => {
      setCurrentUser(false);
      setIsLoggedIn(false);
      history.push('/login');
    })
  }

  useEffect(() => {
    fetch('/protected', {
      credentials: 'include'
    })
    .then(result => result.json())
    .then(data => {
      setCurrentUser(data.user.username)
      setIsLoggedIn(true)
    })
    .catch(err => console.log(err));
  }, [])


  return (
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <Header 
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      <Main>
        <Routing 
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
        />
      </Main>
      <Footer 
        currentUser={currentUser}
      />
    </Wrapper>
  );
}

export default App;
