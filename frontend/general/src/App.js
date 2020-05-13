import React from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header.jsx';
import Routing from './components/Routing';

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
  return (
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <Header/>
      <Main>
        <Routing />
      </Main>
    </Wrapper>
  );
}

export default App;
