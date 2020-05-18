import React from 'react';
import styled from 'styled-components';
import { H1 } from './Shared';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function NoMatch() {
  return (
    <Wrapper>
      <H1>404</H1>
      <p>Sorry little chef, that is an invalid page. Try again.</p>
    </Wrapper>
  )
}

export default NoMatch;