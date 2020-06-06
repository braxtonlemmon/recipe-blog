import React from 'react';
import styled from 'styled-components';
import { H1 } from './Shared';
import button from './shared/Button';

const ImageInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  background: lightgrey;
  padding: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  input {
    font-size: 1.1em;
    padding: 4px;
    text-align: center;
    height: 2.5em;
    line-height: 2.5em;
    outline: none;
  }
  textarea {
    resize: none;
    padding: 5px;
    text-align: center;
    outline: none;
    font-size: 1.1em;
  }
  h2 {
    font-size: 1.3em;
  }
  .ingredients-box, .steps-box {
    background: none;
  }
  .publish-box {
    background: none;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  background: lightgray;
  padding: 8px;
  padding-bottom: 10px;
`;

const RowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1em;
  line-height: 1.1em;
  margin-bottom: 10px;

`;

const Button = styled(button)`
  padding: 5px 15px;
  font-size: 1em;
`;

const MoveButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 8px;
  .publish-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .publish-row >* {
    margin: 0 10px;
    cursor: pointer;
  }
  background: lightgrey;
  padding: 8px;
`;

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

      <Box className="ingredients-box">
        <h2>Ingredients</h2>
        {props.data.ingredients.map((ingredient, index) => (
          <Row key={`ingredient~${index}`}>
            <RowTop>
              <Button onClick={(e) => props.handleRemoveIngredient(e, index)}>{trash}</Button>
              <label htmlFor="ingredient">Ingredient {index + 1}</label>
              <MoveButtons>
                <Button onClick={(e) => props.handleMove(e, index, 'ingredient', 'up')}>{up}</Button>
                <Button onClick={(e) => props.handleMove(e, index, 'ingredient', 'down')}>{down}</Button>
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
              <Button onClick={(e) => props.handleRemoveStep(e, index)}>{trash}</Button>
              <label htmlFor="step">{`Step ${index + 1}`}</label>
              <MoveButtons>
                <Button onClick={(e) => props.handleMove(e, index, 'step', 'up')}>{up}</Button>
                <Button onClick={(e) => props.handleMove(e, index, 'step', 'down')}>{down}</Button>
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


///////////////
// Version with ingredients and steps as array of objects 
//////////////////////
// import React from 'react';
// import styled from 'styled-components';

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// function RecipeFormComponent(props) {
//   return (
//     <Form name="recipeForm">
//       <label htmlFor="title">Title</label>
//       <input 
//         type="text"
//         id="title"
//         name="title"
//         placeholder="Recipe title"
//         value={props.data.title}
//         onChange={props.handleChange}
//       />

//       <label htmlFor="intro">Description</label>
//       <textarea 
//         name="intro" 
//         id="intro"
//         value={props.data.intro}
//         onChange={props.handleChange} 
//         cols="30" 
//         rows="10"
//         placeholder="Description of recipe"
//       ></textarea>
//       {props.data.ingredients.map((ingredient, index) => (
//         <div key={`${ingredient}~${index}`}>
//           <label htmlFor="ingredient">Ingredient</label>
//           <input 
//             type="text"
//             id="ingredient"
//             name="ingredient"
//             placeholder="Ingredient"
//             value={props.data.ingredients[index].ingredient}
//             onChange={(e) => props.handleInputChange(index, e)}
//           />
//           <div onClick={() => props.handleRemoveIngredient(index)}>-</div>
//         </div>
//       ))}
//       <div onClick={props.handleAddIngredient}>+</div>
//       <p>{props.data.title}</p>
//       <p>{props.data.intro}</p>
//     </Form>
//   )
// }

// export default RecipeFormComponent;


