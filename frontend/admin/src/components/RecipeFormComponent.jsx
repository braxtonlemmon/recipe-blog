import React from 'react';
import styled from 'styled-components';
import { H1 } from './Shared';
import {
  ImageInput,
  Form,
  Row,
  RowTop,
  Button,
  MoveButtons,
  Box
} from './RecipeFormStyling';

function RecipeFormComponent(props) {
  const down = '↓';
  const up = '↑';
  const trash = '🗑';

  return (
    <>
    <H1>New Recipe</H1>
    <ImageInput>
      <label htmlFor="image">Image</label>
      <input
        type="file"
        id="image"
        name="image"
      />
    </ImageInput>
    <Form name="recipeForm">
      <Box>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Recipe title"
          value={props.data.title}
          onChange={props.handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="intro">Description</label>
        <textarea
          name="intro"
          id="intro"
          value={props.data.intro}
          onChange={props.handleChange}
          cols="30"
          rows="10"
          placeholder="Description of recipe"
        ></textarea>
      </Box>
      <Box>
        <label htmlFor="quote">Quote</label>
        <textarea
          name="quote"
          id="quote"
          value={props.data.quote}
          onChange={props.handleChange}
          col="20"
          rows="10"
          placeholder="Quote about recipe"
        ></textarea>
      </Box>
      <Box className="ingredients-box">
        <h2>Ingredients</h2>
        {props.data.ingredients.map((ingredient, index) => (
          <Row key={`ingredient~${index}`}>
            <RowTop>
              <Button 
                tabIndex="-1" 
                onClick={(e) => props.handleRemoveIngredient(e, index)}
              >{trash}</Button>
              <label htmlFor="ingredient">Ingredient {index + 1}</label>
              <MoveButtons>
                <Button 
                  tabIndex="-1" 
                  onClick={(e) => props.handleMove(e, index, 'ingredient', 'up')}
                >{up}</Button>
                <Button 
                  tabIndex="-1" 
                  onClick={(e) => props.handleMove(e, index, 'ingredient', 'down')}
                >{down}</Button>
              </MoveButtons>
            </RowTop>
            <input
              type="text"
              id="ingredient"
              name="ingredient"
              placeholder="Ingredient"
              value={props.data.ingredients[index]}
              onChange={(e) => props.handleInputChange(index, e)}
            />
          </Row>
        ))}
        <Button 
          onClick={props.handleAddIngredient}
        >+</Button>
      </Box>
      <Box className="steps-box">
        <h2>Steps</h2>
        {props.data.steps.map((step, index) => (
          <Row key={`step~${index}`}>
            <RowTop>
              <Button 
                tabIndex="-1" 
                onClick={(e) => props.handleRemoveStep(e, index)}
              >{trash}</Button>
              <label htmlFor="step">{`Step ${index + 1}`}</label>
              <MoveButtons>
                <Button 
                  tabIndex="-1" 
                  onClick={(e) => props.handleMove(e, index, 'step', 'up')}
                >{up}</Button>
                <Button 
                  tabIndex="-1" 
                  onClick={(e) => props.handleMove(e, index, 'step', 'down')}
                >{down}</Button>
              </MoveButtons>
            </RowTop>
            <textarea
              id="step"
              name="step"
              placeholder="Step"
              cols="25"
              rows="4"
              value={props.data.steps[index]}
              onChange={(e) => props.handleInputChange(index, e)}
            ></textarea>
          </Row>
        ))}
        <Button 
          onClick={props.handleAddStep}
        >+</Button>
      </Box>
      <Box className="publish-box">
        <div className="publish-row">
          <label htmlFor="is_published">Publish?</label>
          <input 
            type="checkbox" 
            name="is_published" 
            id="is_published"
            checked={props.data.is_published}
            onChange={props.handleChange}
          />
        </div>
      </Box>
      <Button 
        onClick={props.isUpdating ? props.handleUpdate : props.handleSubmit}
      >
        Submit
      </Button>
    </Form>
    <form id="upload_form" enctype="multipart/form-data"></form>
    </>
  );
}

export default RecipeFormComponent;
