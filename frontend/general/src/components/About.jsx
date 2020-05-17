import React from 'react';
import styled from 'styled-components';
import { H1 } from './Shared';

const Wrapper = styled.div`

`;

function About() {
  return (
    <Wrapper>
      <H1>About</H1>
      <ul>
        <li>Recipes should include both metric and imperial units</li>
        <li>If you are using a tablet or laptop, the ingredients shoud always be visible</li>
        <li>The page should not be bloated with photos and ads</li>
        <li>You should be able to visibly keep track of where you are in the recipe</li>
      </ul>
    </Wrapper>
  )
}

export default About;