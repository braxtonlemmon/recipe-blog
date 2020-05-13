import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CommentBox from './CommentBox';
import CommentForm from './CommentFormContainer';
import { H1, H2 } from './Shared'; 

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 90%;
  grid-template-areas:
    "title"
    "pic"
    "about"
    "ingredients"
    "steps"
    "commentForm"
    "commentBox"
  ;
  @media (min-width: 1000px) {
    grid-template-areas:
      "title title"
      "pic about"
      "ingredients steps"
      "commentForm commentForm"
      "commentBox commentBox"
    ;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 5px;
  border: 1px solid black;
  align-items: center;
`;

const AboutBox = styled(InfoBox)`
  grid-area: about;
`;

const IngredientsBox = styled(InfoBox)`
  grid-area: ingredients;
`;

const StepsBox = styled(InfoBox)`
  grid-area: steps;
`;

const MyH1 = styled(H1)`
  grid-area: title;
`

const Image = styled.div`
  background-image: url(${(props) => props.url});
  grid-area: pic;
  height: 250px;
  width: 250px;
  background-size: cover;
  background-position: center;
  box-shadow: -12px 7px 2px #383838, 12px 12px 2px #5c5c5c;
  margin: 20px;
  @media (min-width: 600px) {
    height: 500px;
    width: 500px;
  }
`;

const Step = styled.li`
  margin: 5px;
`;

function RecipePage() {
  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/recipes/${id}`)
    .then(result => result.json())
    .then(data => setRecipe(data.data))
    .then(() => setRecipeLoaded(true))
  }, [id])

  useEffect(() => {
    fetch(`/comments/${id}`)
    .then(result => result.json())
    .then(data => setComments(data.data))
    .then(() => setCommentsLoaded(true))
  }, [commentsLoaded])

  if (recipeLoaded && commentsLoaded) {
    return (
      <Wrapper>
        <MyH1>{recipe.title}</MyH1>
        <Image url={recipe.image}></Image>
        <AboutBox>
          <H2>About</H2>
          <p>{recipe.intro}</p>
        </AboutBox>
        <IngredientsBox>
          <H2>Ingredients</H2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>☐ {ingredient}</li>
            ))}
          </ul>
        </IngredientsBox>
        <StepsBox>
          <H2>Steps</H2>
          <ul>
            {recipe.steps.map((step, index) => (
              <Step key={step}>{index + 1}: {step}</Step>
            ))}
          </ul>
        </StepsBox>
        <CommentForm 
          recipe={recipe}
          setCommentsLoaded={setCommentsLoaded}
        />
        <CommentBox comments={comments} />
      </Wrapper>
    );
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default RecipePage;