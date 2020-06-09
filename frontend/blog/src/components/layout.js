import React from "react"
import styled from 'styled-components';
import PropTypes from "prop-types"
import Header from './Header';
import Footer from './Footer';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
  min-height: 100vh;
`

const Main = styled.main`
  margin-top: 4em;
  padding-bottom: 3em;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;

  grid-area: main;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
