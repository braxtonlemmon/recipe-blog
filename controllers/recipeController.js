const indexRecipes = (req, res, next) => {
  res.send('all recipes');
}

const newRecipe = (req, res, next) => {
  res.send('createGet');
}

const createRecipe = (req, res, next) => {
  res.send('createPost')
}

const editRecipe = (req, res, next) => {
  res.send('editGet');
}

const updateRecipe = (req, res, next) => {
  res.send('update recipe');
}

const destroyRecipe = (req, res, next) => {
  res.send('destroy recipe');
}

const showRecipe = (req, res, next) => {
  res.send('show recipe')
}

export default {
  indexRecipes,
  newRecipe,
  createRecipe,
  editRecipe,
  updateRecipe,
  destroyRecipe,
  showRecipe
}