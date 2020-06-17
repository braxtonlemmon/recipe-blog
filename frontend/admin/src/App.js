import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Routing from './components/Routing';
import Footer from './components/Footer';
import Cookies from 'js-cookie';

const Wrapper = styled.div`
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
  width: 100%;
  height: 100%;
  margin-bottom: 3.5em;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setCurrentUser(name);
  }

  useEffect(() => {
    fetch('/me', {
      credentials: 'include',
      method: 'GET'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Not yet logged in";
      }})
    .then(data => {
      if (data.user) {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
      }
    })
    .catch(err => console.log('problem'));
  }, [])
  
  const handleLogout = () => {
    fetch('/auth/logout')
    .then(() => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      history.push('/login');
    })
  }

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
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    </Wrapper>
  );
}

export default App;
