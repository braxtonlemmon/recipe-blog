import React, { useState, useEffect } from 'react';
import RecipeFormComponent from './RecipeFormComponent';
import { useParams, useHistory } from 'react-router-dom';

function RecipeFormContainer() {
  const history = useHistory();
  const { recipeid } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState({
    title: '',
    ingredients: [''],
    steps: [''],
    intro: '',
    image: null,
    published: false,
    created: ''
  })
  
  useEffect(() => {
    if (recipeid) {
      fetch(`/recipes/${recipeid}`, {
        credentials: 'include',
        method: 'GET'
      })
      .then(result => result.json())
      .then(final => {
          setRecipe(final.data)
        })
      .catch(err => console.log('problem!'))
    }
   }, [recipeid])

   useEffect(() => {
     if (recipe) {
      setIsUpdating(true);
      setData({ ...data, 
        title: recipe.title,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        intro: recipe.intro,
        image: recipe.image,
        published: recipe.published,
        created: recipe.created
      })
    }
   }, [recipe])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.name === 'published' ?
      e.target.checked : e.target.value;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    const image = document.getElementById('image');
    formData.append('image', image.files[0]);
    formData.append('title', data.title);
    formData.append('ingredients', data.ingredients);
    formData.append('steps', data.steps);
    formData.append('intro', data.intro);
    formData.append('published', data.published);
    fetch('/recipes', {
      method: 'POST',
      credentials: 'include',
      body: formData,

    })
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw new Error('Network response was not okay uploading recipe');
    })
    .then(data => {
      history.push(`/recipes/${data._id}`);
    })
    .catch(err => console.log(err.message));
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    const image = document.getElementById('image');
    formData.append("image", image.files[0]);
    formData.append("title", data.title);
    formData.append("ingredients", data.ingredients);
    formData.append("steps", data.steps);
    formData.append("intro", data.intro);
    formData.append("published", data.published);
    fetch(`/recipes/${recipeid}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    })
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw new Error('Network response was not okay');
    })
    .then(data => {
      history.push(`/recipes/${recipeid}`);
    })
    .catch(err => console.log(err.message));
  }

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    if (name === 'ingredient') {
      const values = [...data.ingredients];
      values[index] = value;
      setData({...data, ingredients: values});
    } 
    else if (name === 'step') {
      const values = [...data.steps];
      values[index] = value;
      setData({...data, steps: values});
    }
  }

  const handleAddIngredient = () => {
    const values = [...data.ingredients];
    values.push('');
    setData({...data, ingredients: values});
  }

  const handleRemoveIngredient = (index) => {
    console.log(index);
    const values = [...data.ingredients];
    values.splice(index, 1);
    setData({...data, ingredients: values});
  }

  const handleAddStep = () => {
    const values = [...data.steps];
    values.push('');
    setData({...data, steps: values});
  }

  const handleRemoveStep = (index) => {
    const values = [...data.steps];
    values.splice(index, 1);
    setData({...data, steps: values});
  }

  return (
    <>
      <RecipeFormComponent
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleAddIngredient={handleAddIngredient}
        handleRemoveIngredient={handleRemoveIngredient}
        handleAddStep={handleAddStep}
        handleRemoveStep={handleRemoveStep}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default RecipeFormContainer;




/////////////////
// Version with ingredients and steps as array of objects //
/////////////////

// import React, { useState } from 'react';
// import RecipeFormComponent from './RecipeFormComponent';
// import styled from 'styled-components';

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 100px;
// `;

// function RecipeFormContainer() {
//   const [data, setData] = useState({
//     title: '',
//     ingredients: [{ingredient: ''}, {ingredient: ''}],
//     steps: [{step: ''}],
//     intro: '',
//     image: null,
//     published: false,
//     created: ''
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   }

//   const handleSubmit = () => {
//     console.log('submitting...');
//   }

//   const handleInputChange = (index, e) => {
//     console.log(e.target.value);
//     const values = [...data.ingredients];
//     values[index].ingredient = e.target.value;
//     setData({...data, ingredients: values});
//   }

//   const handleAddIngredient = () => {
//     const values = [...data.ingredients];
//     values.push({ingredient: ''});
//     setData({...data, ingredients: values});
//   }

//   const handleRemoveIngredient = (index) => {
//     console.log(index);
//     const values = [...data.ingredients];
//     values.splice(index, 1);
//     setData({...data, ingredients: values});
//   }

//   return (
//     <Wrapper>
//       <RecipeFormComponent 
//         data={data} 
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         handleInputChange={handleInputChange}
//         handleAddIngredient={handleAddIngredient}
//         handleRemoveIngredient={handleRemoveIngredient}
//       />
//       <pre>
//         {JSON.stringify(data, null, 2)}
//       </pre>
//     </Wrapper>
//   )
// }

// export default RecipeFormContainer;

