import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { H1, H2 } from './Shared';

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
  font-size: 1.5em;
  @media (min-width: 600px) {
    font-size: 2.2em;
  }
`;

const Buttons = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
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


function Header(props) {
  return (
    <HeaderBar>
      <MyH1>decoded recipes</MyH1>
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
          <Button onClick={props.handleLogout}>Log out</Button>
        </Buttons>
      )}
    </HeaderBar>
  );
}

export default Header;
