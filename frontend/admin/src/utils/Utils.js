function getRecipe(id) {
  let recipe = {};
  fetch(`/recipes/${id}`, {
    credentials: 'include',
    method: 'GET'
  })
  .then(result => result.json())
  .then(data => {
    recipe = data.data;
  })
  return recipe
}

export {
  getRecipe
}