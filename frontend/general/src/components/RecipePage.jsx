import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CommentBox from './CommentBox';
import CommentForm from './CommentFormContainer';
import { H1, H2 } from './Shared'; 

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: baseline;

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
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      "title title"
      "pic pic"
      "about about"
      "ingredients steps"
      "commentForm commentForm"
      "commentBox commentBox"
    ;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 5px;
  align-items: center;
`;

const AboutBox = styled(InfoBox)`
  grid-area: about;
`;

const IngredientsBox = styled(InfoBox)`
  grid-area: ingredients;
  @media (min-width: 1000px) {
    ${props => {
      if (props.fixed) {
        return `
        position: fixed;
        top: 50;
        width: 17.1vw;
        `
      }
    }}
  }
`;

const StepsBox = styled(InfoBox)`
  grid-area: steps;
  justify-self: left;
  border-left: 2px dashed black;
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

const Ingredient = styled.li`
  margin: 10px;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: 2.5em 1fr;
  align-items: center;
  border-bottom: 1px dotted black;
  .checkbox {
    appearance: none;
    border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
    background-color: white;
    height: 1.8em;
    width: 1.8em;
    box-shadow: 1px 1px 1px grey;
    outline: none;
  }

  .checkbox:checked:after {
    content: '🧀'; 
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.5em;
    font-weight: 600;
    height: 100%;
    width: 100%;
    color: black;
    background-color: lightgoldenrodyellow;
  }
`;

const Step = styled.li`
  margin: 5px 10px 15px 10px;
  padding-bottom: 10px;
  border-bottom: 1px dotted black;
  display: grid;
  grid-template-columns: 3em 1fr;
  align-items: center;
  gap: 10px;

  .step-box-holder {
    height: 2.2em;
    width: 2.2em;
    position: relative;
    display: flex;
    justify-content: center;
  }

  input {
    appearance: none;
    height: 0;
    width: 0;
  }

  .step-number {
    position: absolute;
    font-size: 2em;
    z-index: 5;
    cursor: pointer;
  }

  .step-text {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  input:checked + label {
    color: lightgrey;
  }

`;

function RecipePage() {
  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [ingredientsFixed, setIngredientsFixed] = useState(false);
  const { id } = useParams();

  const handleScroll = () => {
    const ingredientsBox = document.getElementById('ingredients-box').getBoundingClientRect();
    const stepsBox = document.getElementById('steps-box').getBoundingClientRect();
    if (stepsBox.top <= 55 && ingredientsBox.height < window.innerHeight - 150) {
      console.log('there!');
      setIngredientsFixed(true);
    } else if (stepsBox.top > 55) {
      setIngredientsFixed(false);
    }
  }


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

  useEffect(() => {
    if (recipeLoaded && commentsLoaded) {  
      window.addEventListener('scroll', handleScroll)
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [recipeLoaded, commentsLoaded])

  if (recipeLoaded && commentsLoaded) {
    return (
      <Wrapper>
        <MyH1>{recipe.title}</MyH1>
        <Image url={recipe.image}></Image>
        <AboutBox>
          <H2>About</H2>
          <p>{recipe.intro}</p>
        </AboutBox>
        <IngredientsBox fixed={ingredientsFixed} id="ingredients-box">
          <H2>Ingredients</H2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <Ingredient key={ingredient}>
                <input className="checkbox" type="checkbox"></input>
                {/* <span onClick={() => handleClick} class="checkbox">☐</span>  */}
                <p>{ingredient}</p>
              </Ingredient>
            ))}
          </ul>
        </IngredientsBox>
        <StepsBox id="steps-box">
          <H2>Steps</H2>
          <ul>
            {recipe.steps.map((step, index) => (
              <Step key={step}
                num={index + 1}
              >
                <div className="step-box-holder">
                  <input type="checkbox" id={`step-checkbox-${index}`}></input>
                  <label className="step-number" htmlFor={`step-checkbox-${index}`}>{index + 1}</label>
                </div>
                <label className= "step-text" htmlFor={`step-checkbox-${index}`}>{step}</label>
                {/* <p>{step}</p> */}
              </Step>
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