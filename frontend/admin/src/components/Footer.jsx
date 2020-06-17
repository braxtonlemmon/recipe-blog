import React from 'react';
import styled from 'styled-components';
// import { isLoggedIn } from '../utils/Utils';

const FooterBar = styled.footer`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: 3px solid black;
  padding: 10px;
  background: white;
  z-index: 5;
  display: flex;
  justify-content: center;
`;

function Footer(props) {
  return (
    <FooterBar>
      <p>{ props.isLoggedIn ? `Welcome back ${props.currentUser}` : 'Please login'}</p>
    </FooterBar>
  )
}

export default Footer;