import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Comments from './Comments';
import { H2 } from './Headings';
import SEO from '../components/seo';
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

function RecipePage({ data }) {
  const recipe = data.mongodbTestRecipes;
  const [ingredientsFixed, setIngredientsFixed] = useState(false);
  const [checkboxes, setCheckboxes] = useState(loadCheckboxes());

  function loadCheckboxes() {
    if (typeof window !== 'undefined') {
      const storedData = JSON.parse(localStorage.getItem(recipe.id));
      return storedData === null ? {} : storedData;
    } else {
      return {};
    }
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(recipe.id));
    if (storedData === null) {
      localStorage.setItem(recipe.id, JSON.stringify({}));
    } else {
      setCheckboxes({...storedData})
    }
  }, [])


  useEffect(() => {
    const isWindow = typeof window !== 'undefined';
    if (isWindow) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => isWindow ? window.removeEventListener('scroll', handleScroll) : null;
  })

  function handleScroll() {
    const ingredientsBox = document.getElementById('ingredients-box').getBoundingClientRect();
    const stepsBox = document.getElementById('steps-box').getBoundingClientRect();
    if (stepsBox.top <= 55 && ingredientsBox.height < window.innerHeight - 150) {
      setIngredientsFixed(true);
    } else if (stepsBox.top > 55) {
      setIngredientsFixed(false);
    }
  }

  function handleCheck(e) {
    const storedData = JSON.parse(localStorage.getItem(recipe.id));
    console.log(e.target.id);
    storedData[e.target.id] = e.target.checked;
    localStorage.setItem(recipe.id, JSON.stringify(storedData));
    console.log(storedData);
    setCheckboxes(storedData);
  }

  return (
    <>
      <SEO title={recipe.title} description={recipe.intro} />
      <Wrapper>
        <MyH1>{recipe.title}</MyH1>
        <Image url={recipe.image}></Image>
        <Image>
          {recipe.mainImage && (
            <Img
              className="main-image"
              fluid={recipe.mainImage.childImageSharp.fluid}
              alt={recipe.title}
            />
          )}
        </Image>
        <AboutBox>
          <H2>About</H2>
          <p>{recipe.intro}</p>
        </AboutBox>
        <IngredientsBox fixed={ingredientsFixed} id="ingredients-box">
          <H2>Ingredients</H2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <Ingredient   
                key={ingredient}
                done={checkboxes[`ingredient-checkbox-${index}`]}
                checkboxes={checkboxes}
              >
                <input
                  className="checkbox"
                  type="checkbox"
                  id={`ingredient-checkbox-${index}`}
                  defaultChecked={checkboxes[`ingredient-checkbox-${index}`] === true}
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
                <label className="step-text" htmlFor={`step-checkbox-${index}`}>{step}</label>
              </Step>
            ))}
          </ul>
        </StepsBox>
        <Comments
          mongodb_id={recipe.mongodb_id}
        />
      </Wrapper>
    </>
  )
}

export default RecipePage;

export const pageQuery = graphql`
  query($id: String!) {
    mongodbTestRecipes(id: { eq: $id }) {
      id
      mongodb_id
      title
      image
      ingredients
      intro
      steps
      mainImage {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;