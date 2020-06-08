import React from "react"
import styled from 'styled-components';
import PropTypes from "prop-types"
import Header from './Header';
import Footer from './Footer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  align-items: stretch;
`

const Main = styled.main`
  display: flex;
  margin-top: 5em;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 3.5em;
  flex-shrink: 0;
  flex-grow: 1;
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
