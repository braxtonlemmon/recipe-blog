import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const Buttons = styled.div`
  display: flex;
`;

function Header(props) {
  return (
    <HeaderBar>
      <H1>Remember To Cook</H1>
      {!props.isLoggedIn && (
        <Buttons>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
        </Buttons>
      )}
      {props.isLoggedIn && (
        <Buttons>
          <Link to="/"><Button>Home</Button></Link>
          <Link to="/recipes"><Button>Recipes</Button></Link>
          <Link to="/new"><Button>New</Button></Link>
          <Link to='/bananas'><Button>Image</Button></Link>
          <Button onClick={props.handleLogout}>Log out</Button>
        </Buttons>
      )}
    </HeaderBar>
  );
}

export default Header;
