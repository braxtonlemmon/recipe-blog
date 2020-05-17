import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import { H2 } from './Shared'; 
import { 
  Wrapper, 
  AboutBox,
  IngredientsBox,
  StepsBox,
  MyH1,
  Image,
  Ingredient,
  Step
} from './RecipePageStyling';

function RecipePage() {
  const [recipe, setRecipe] = useState({});
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [ingredientsFixed, setIngredientsFixed] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});
  const { id } = useParams();

  
  // Fetch recipe data from db
  useEffect(() => {
    const abortController = new AbortController();

    fetch(`/recipes/${id}`, { signal: abortController.signal })
    .then(result => result.json())
    .then(data => setRecipe(data.data))
    .then(() => {
      console.log('1: recipe loaded')
      setRecipeLoaded(true);
    })
    .catch(err => {
      console.error('Request failed', err);
    });

    return () => abortController.abort();
  }, [id])
  
  // Get checkbox data from localStorage and store in state
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(recipe._id));
    if (recipeLoaded && data === null) {
      localStorage.setItem(recipe._id, JSON.stringify({}));
    } else {
      setCheckboxes({...data})
    }
    console.log('3: checkbox data loaded');
  }, [recipeLoaded, recipe]);

  // Add scroll event listener for ingredients box
  useEffect(() => {
    console.log('event listener adding...');
    if (recipeLoaded) {
      window.addEventListener('scroll', handleScroll)
    }
    console.log('4: scroll event added');
    return () => window.removeEventListener('scroll', handleScroll)
  }, [recipeLoaded]);

  function handleScroll() {
    if (recipeLoaded) {
      console.log('inside handle scroll');
      const ingredientsBox = document.getElementById('ingredients-box').getBoundingClientRect();
      const stepsBox = document.getElementById('steps-box').getBoundingClientRect();
      if (stepsBox.top <= 55 && ingredientsBox.height < window.innerHeight - 150) {
        setIngredientsFixed(true);
      } else if (stepsBox.top > 55) {
        setIngredientsFixed(false);
      }
    }
  }

  function handleCheck(e) {
    const data = JSON.parse(localStorage.getItem(recipe._id));
    data[e.target.id] = e.target.checked;
    localStorage.setItem(recipe._id, JSON.stringify(data));
    setCheckboxes(data);
  }

  if (recipeLoaded) {
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
            {recipe.ingredients.map((ingredient, index) => (
              <Ingredient key={ingredient}>
                <input 
                  className="checkbox" 
                  type="checkbox"
                  id={`ingredient-checkbox-${index}`}
                  defaultChecked={checkboxes[`ingredient-checkbox-${index}`] === true ? true : false}
                  onChange={handleCheck}
                ></input>
                <p>{ingredient}</p>
              </Ingredient>
            ))}
          </ul>
        </IngredientsBox>
        <StepsBox id="steps-box">
          <H2>Steps</H2>
          <p className='sidenote'>***click each step as you go to keep track of your progress***</p>
          <ul>
            {recipe.steps.map((step, index) => (
              <Step 
                key={step}
                done={checkboxes[`step-checkbox-${index}`]}
              >
                <div className="step-box-holder">
                  <input 
                    type="checkbox" 
                    id={`step-checkbox-${index}`}
                    defaultChecked={checkboxes[`step-checkbox-${index}`] === true ? true : false}
                    onChange={handleCheck}
                  ></input>
                  <label className="step-number" htmlFor={`step-checkbox-${index}`}>{index + 1}</label>
                </div>
                <label className= "step-text" htmlFor={`step-checkbox-${index}`}>{step}</label>
              </Step>
            ))}
          </ul>
        </StepsBox>
        <Comments
          recipe={recipe}
          id={id}
        />
      </Wrapper>
    );
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default RecipePage;