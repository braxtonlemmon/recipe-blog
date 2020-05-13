import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function NoMatch() {
  return (
    <Wrapper>
      <h1>404</h1>
      <p>Sorry little chef, that is an invalid page. Try again.</p>
    </Wrapper>
  )
}

export default NoMatch;