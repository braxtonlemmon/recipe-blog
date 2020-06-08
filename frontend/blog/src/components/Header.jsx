import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { H1 } from './Headings';

const HeaderBar = styled.div`
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 10px;
  background: white;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px dashed black;
  z-index: 10;
`;

const MyH1 = styled(H1)`
  font-size: 1.4em;
  margin: 0;
  padding: 0;
  @media (min-width: 600px) {
    font-size: 2.2em;
  }
`;

const Buttons = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

const Button = styled.button`
  display: flex;
  background-color: #754c4ccf;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 7px;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: -2px 2px 2px darkgrey;
    transform: scale(1.01);
  }
  outline: none;
`;

function Header() {
  return (
    <HeaderBar>
      <Link to='/'>
        <MyH1>decoded recipes</MyH1>
      </Link>
      <Buttons>
        <Link to='/'><Button>Recipes</Button></Link>
        <Link to='/About'><Button>About</Button></Link>
        <Link to='/Contact'><Button>Contact</Button></Link>
      </Buttons>
    </HeaderBar>
  )
}

export default Header;

