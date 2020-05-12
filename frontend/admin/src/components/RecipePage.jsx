import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CommentBox from './CommentBox';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
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
  text-shadow: 1px 1px grey, -1px 2px lightgreen;
`;

const H1 = styled(H2)`
  font-size: 2.5em;
  margin: 15px 0 0 0;
`;

const Image = styled.div`
  background-image: url(${(props) => props.url});
  height: 250px;
  width: 250px;
  background-size: cover;
  background-position: center;
  /* border-radius: 15px; */
  box-shadow: -12px 7px 2px #383838, 12px 12px 2px #5c5c5c;
  margin: 20px;
  @media (min-width: 600px) {
    height: 500px;
    width: 500px;
  }
`;

function RecipePage() {
  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/recipes/${id}`, {
      credentials: 'include',
      method: 'get'
    })
      .then(result => result.json())
      .then(data => {
        console.log(data.data)
        setRecipe(data.data)
      })
      .then(() => setRecipeLoaded(true));
  }, []);

  useEffect(() => {
    fetch(`/comments/${id}`, {
      credentials: 'include',
      method: 'get'
    })
      .then(result => result.json())
      .then(data => setComments(data.data))
      .then(() => setCommentsLoaded(true));
  }, []);
  if (recipeLoaded && commentsLoaded) {

    return (
      <Wrapper>
      <H1>{recipe.title}</H1>
      <Image url={recipe.image}></Image>
      <InfoBox>
        <H2>About</H2>
        <p>{recipe.intro}</p>
      </InfoBox>
      <p>{recipe.date_formatted}</p>
      <InfoBox>
        <H2>Ingredients</H2>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>☐ {ingredient}</li>
            ))}
          </ul>
      </InfoBox>
      <InfoBox>
        <H2>Steps</H2>
        <ul>
        {recipe.steps.map((step, index) => (
          <li key={step}>{index + 1} - {step}</li>
          ))}
          </ul>
        </InfoBox>
      <CommentBox comments={comments} />
    </Wrapper>
  );
} else {
  return (
    <h1>loading..</h1>
  )
}
}

export default RecipePage;