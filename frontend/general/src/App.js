import React from 'react';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header.jsx';
import Routing from './components/Routing';
import Footer from './components/Footer';

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  align-items: stretch;

`;

const Main = styled.div`
  display: flex;
  margin-top: 5em;
  /* align-items: center; */
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 3.5em;
  flex-shrink: 0;
  flex-grow: 1;
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
      <Footer />
    </Wrapper>
  );
}

export default App;
