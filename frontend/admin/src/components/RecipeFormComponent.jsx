import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  margin: 5px 0;
  padding-bottom: 10px;
  border-bottom: 1px dotted black;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 8px;
`;

const Button = styled.div`
  cursor: pointer;
  border: 1px solid black;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function RecipeFormComponent(props) {
  return (
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
        <h2>Ingredients</h2>
        {props.data.ingredients.map((ingredient, index) => (
          <Row key={`ingredient~${index}`}>
            <label htmlFor="ingredient">Ingredient</label>
            <input
              type="text"
              id="ingredient"
              name="ingredient"
              placeholder="Ingredient"
              value={props.data.ingredients[index]}
              onChange={(e) => props.handleInputChange(index, e)}
            />
            <Button onClick={() => props.handleRemoveIngredient(index)}>
              -
            </Button>
          </Row>
        ))}
        <Button onClick={props.handleAddIngredient}>➕</Button>
      </Box>

      <Box>
        <h2>Steps</h2>
        {props.data.steps.map((step, index) => (
          <Row key={`step~${index}`}>
            <label htmlFor="step">{`Step ${index + 1}`}</label>
            <textarea
              id="step"
              name="step"
              placeholder="Step"
              cols="35"
              rows="4"
              value={props.data.steps[index]}
              onChange={(e) => props.handleInputChange(index, e)}
            ></textarea>
            <Button onClick={() => props.handleRemoveStep(index)}>-</Button>
          </Row>
        ))}
        <Button onClick={props.handleAddStep}>➕</Button>
      </Box>

      <Box>
        <label htmlFor="published">Publish?</label>
        <input 
          type="checkbox" 
          name="published" 
          id="published"
          checked={props.data.published}
          onChange={props.handleChange}
        />
      </Box>
      <button onClick={props.handleSubmit}>Submit</button>
    </Form>
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


