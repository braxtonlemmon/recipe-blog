import React from 'react';
import styled from 'styled-components';

const HeaderBar = styled.div`
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
  border-bottom: 4px dashed black;
  z-index: 10;
`;

const H1 = styled.h1`
  font-size: 1.5em;
  @media (min-width: 600px) {
    font-size: 2.2em;
  }
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

function Header(props) {
  return (
    <HeaderBar>
      <H1>Remember To Cook</H1>
      <Button onClick={props.handleClickHome}>Home</Button>
    </HeaderBar>
  )
}

export default Header;