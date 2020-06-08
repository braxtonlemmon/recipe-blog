import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.footer`
  background: #754c4ccf;
  width: 100%;
  flex-shrink: 0;
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-evenly;
  a {
    color: white;
    margin: 0 10px;
    &:hover {
      color: lightgray;
    }
  }
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
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
        <Link to='/'>Recipes</Link> -
        <Link to='/about'>About</Link> -
        <Link to='/contact'>Contact</Link>
      </Links>
      <Copyright>
        <span role="img" aria-label="copyright">©</span>
        <span>2020 - Remember to Cook. All rights reserved.</span>
      </Copyright>
    </Wrapper>
  )
}

export default Footer;