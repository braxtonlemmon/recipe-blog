import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { H1, H2 } from './Shared';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1.5fr 1fr 25px 25px;
  .item {
    border: 1px solid black;
    text-align: center;
    padding: 8px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    font-weight: bold;
  }
  .button {
    cursor: pointer;
  }
  a {
    color: #6c6cff;
    &:hover {
      color: #1d1dff;
    }
  }
`;

function Recipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [recipesLoaded, setRecipesLoaded] = useState(false);

  useEffect(() => {
    fetch('/recipes', {
      method: 'get'
    })
    .then(result => result.json())
    .then(data => setRecipes(data.data))
    .then(() => setRecipesLoaded(true))
  }, [])

  const handleDelete = (id) => {
    const verify = window.confirm('Are you sure you want to delete this recipe?');
    if (verify === true) {
      fetch(`/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          recipeid: id
        })
      })
      .then(response => {
        if (response.ok && response.status === 200) {
          history.push('/recipes');
          return response.json();
        }
        throw new Error('Network response was not okay.');
      })
      .catch(err => console.log(err.message));
    }
  }
    
  if (recipesLoaded) {
    return (
      <Wrapper>
        <H1>Recipes</H1>
        <ul>
          <Row>
            <p className="header item">Recipe</p>
            <p className="header item">Published</p>
            <p className="header item"></p>
            <p className="header item"></p>
          </Row>
          {recipes.map((recipe, index) => (
            <Row key={recipe.title}>
              <div className="item">
                <Link to={`/recipes/${recipe._id}`}>
                  <p>{recipe.title}</p>
                </Link>
              </div>
              <div className="item">
                <p>{recipe.is_published ? recipe.publish_date_formatted : 'Not yet'}</p>
              </div>
              <div className="item">
                <Link to={`/recipes/${recipe._id}/edit`}>
                  <p>🖉</p>
                </Link>
              </div>
              <a className="item">
                <p className="button" onClick={() => handleDelete(recipe._id)}>
                  🗑️
                </p>
              </a>
            </Row>
          ))}
        </ul>
      </Wrapper>
    );
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default Recipes;