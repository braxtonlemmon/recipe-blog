import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.footer`
  background: brown;
  width: 100%;
  flex-shrink: 0;
  color: white;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-evenly;
  a {
    color: white;
  }
`;

const Copyright = styled.div`
  display: flex;
  span:first-child {
    font-size: 30px;
  }
  align-items: center;
`;

function Footer() {
  return (
    <Wrapper>
      <Links>
        <Link to='/'>Recipes</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </Links>
      <Copyright>
        <span role="img" aria-label="copyright">©</span>
        <span>2020 - Remember to Cook</span>
      </Copyright>
    </Wrapper>
  )
}

export default Footer;