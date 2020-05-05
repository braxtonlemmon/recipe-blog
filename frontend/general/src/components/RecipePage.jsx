import React from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 5px;
  border: 1px solid black;
  align-items: flex-start;
`;

const H2 = styled.h2`
  font-size: 1.5em;
  text-align: center;
  align-self: center;
  margin-bottom: 10px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.url});
  height: 500px;
  width: 500px;
  background-size: cover;
  background-position: center;
  /* border-radius: 15px; */
  box-shadow: -12px 7px 2px #383838, 12px 12px 2px #5c5c5c;
  margin: 20px;
`;

function RecipePage(props) {
  return (
    <Wrapper>
      <H2>{props.recipe.title}</H2>
      <Image url={props.recipe.image}></Image>
      <InfoBox>
        <H2>About</H2>
        <p>{props.recipe.intro}</p>
      </InfoBox>
      <InfoBox>
        <H2>Ingredients</H2>
        <ul>
          {props.recipe.ingredients.map((ingredient) => (
            <li>☐ {ingredient}</li>
          ))}
        </ul>
      </InfoBox>
      <InfoBox>
        <H2>Steps</H2>
        <ul>
          {props.recipe.steps.map((step, index) => (
            <li>{index + 1} - {step}</li>
          ))}
        </ul>
      </InfoBox>
      <CommentBox comments={props.comments} />
    </Wrapper>
  );
}

export default RecipePage;