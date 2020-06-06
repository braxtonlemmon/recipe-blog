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
    quote: '',
    image: null,
    is_published: false,
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
          console.log(final.data);
          setRecipe(final.data);
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
        quote: recipe.quote,
        image: recipe.image,
        is_published: recipe.is_published,
        created: recipe.created
      })
    }
   }, [recipe])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.name === 'is_published' ?
      e.target.checked : e.target.value;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    const image = document.getElementById('image');

    formData.append('image', image.files[0]);
    formData.append('title', data.title);
    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append('steps', JSON.stringify(data.steps));
    formData.append('intro', data.intro);
    formData.append('quote', data.quote);
    formData.append('is_published', data.is_published);
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
      history.push(`/recipes`);
    })
    .catch(err => console.log(err.message));
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    const image = document.getElementById('image');

    formData.append("image", image.files[0]);
    formData.append("title", data.title);
    formData.append("ingredients", JSON.stringify(data.ingredients));
    formData.append("steps", JSON.stringify(data.steps));
    formData.append("intro", data.intro);
    formData.append("quote", data.quote);
    formData.append("is_published", data.is_published);
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
      history.push(`/recipes`);
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

  const handleMove = (e, index, type, direction) => {
    e.preventDefault();
    const values = type === 'step' ? [...data.steps] : [...data.ingredients];
    const hold = values[index];
    if (direction === 'down' && index < values.length - 1) {
      values[index] = values[index + 1];
      values[index + 1] = hold;
      type === 'step' ? setData({...data, steps: values}) : setData({...data, ingredients: values});
    }
    else if (direction === 'up' && index > 0) {
      values[index] = values[index - 1];
      values[index - 1] = hold;
      type === 'step' ? setData({ ...data, steps: values }) : setData({ ...data, ingredients: values });
    }
  }

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const values = [...data.ingredients];
    values.push('');
    setData({...data, ingredients: values});
  }

  const handleRemoveIngredient = (e, index) => {
    e.preventDefault();
    console.log(index);
    const values = [...data.ingredients];
    values.splice(index, 1);
    setData({...data, ingredients: values});
  }

  const handleAddStep = (e) => {
    e.preventDefault();
    const values = [...data.steps];
    values.push('');
    setData({...data, steps: values});
  }

  const handleRemoveStep = (e, index) => {
    e.preventDefault();
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
        handleMove={handleMove}
      />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}

export default RecipeFormContainer;


