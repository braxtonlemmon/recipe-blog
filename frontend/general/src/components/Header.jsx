import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { H1 } from './Shared';

const HeaderBar = styled.div`
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 10px;
  height: 3em;
  background: white;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px dashed black;
  z-index: 10;

`;

const MyH1 = styled(H1)`
  font-size: 1.4em;
  @media (min-width: 600px) {
    font-size: 2.2em;
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 2px solid black;
  cursor: pointer;
  &:hover {
    background: lightyellow;
  }
  outline: none;
`;

function Header() {
  return (
    <HeaderBar>
      <MyH1>Remember To Cook</MyH1>
      <Buttons>
        <Link to='/'><Button>Recipes</Button></Link>
        <Link to='/About'><Button>About</Button></Link>
        <Link to='/Contact'><Button>Contact</Button></Link>
      </Buttons>
    </HeaderBar>
  )
}

export default Header;