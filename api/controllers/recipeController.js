import Recipe from '../models/recipe';
import { body, validationResult } from 'express-validator';

const indexRecipes = (req, res, next) => {
  Recipe.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
}

const showRecipe = (req, res, next) => {
  Recipe.findById(req.params.id)
  .exec(function(err, recipe) {
    if (err) { return next(err) }
    if (recipe === null) {
      const err = new Error('Recipe not found');
      err.status = 404;
      return next(err);
    }
    return res.json({ success: true, data: recipe });
  });
};
const createRecipe = [
  body('title', 'Title is required').trim().isLength({ min: 1 }),
  body('ingredients', 'Ingredients are required.').exists(),
  body('steps', 'Recipe steps are required.').exists(),
  
  body('title').escape(),
  body('ingredients.*').escape(),
  body('steps.*').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
    })
    if (!errors.isEmpty()) {
      res.send({ recipe: recipe, errors: errors.array() });
      return;
    }
    else {
      req.body.intro ? (recipe.intro = req.body.intro) : null;
      req.body.image ? (recipe.image = req.body.image) : null;
      recipe.save(function(err) {
        if (err) { return next(err) }
        res.send(recipe);
      })
    }
  }
];

const updateRecipe = [
  body("title", "Title is required").trim().isLength({ min: 1 }),
  body("ingredients", "Ingredients are required.").exists(),
  body("steps", "Recipe steps are required.").exists(),

  body('title').escape(),
  body('ingredients.*').escape(),
  body('steps.*').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      _id: req.params.id
    });
    req.body.intro ? (recipe.intro = req.body.intro) : null;
    req.body.image ? (recipe.image = req.body.image) : null;
    if (!errors.isEmpty()) {
      res.send(errors.array());
      return;
    }
    else {
      Recipe.findByIdAndUpdate(req.params.id, recipe, {}, function (err, theRecipe) {
        if (err) {
          return next (err);
        }
        res.send(theRecipe);
      })
    }
  }
];

const destroyRecipe = (req, res, next) => {
  Recipe.findById(req.params.id)
  .exec(function(err, recipe) {
    if (err) { return next(err) }
    Recipe.findByIdAndRemove(req.body.recipeid, function deleteRecipe(err) {
      if (err) { return next(err) }
      res.send('recipe deleted')
    })
  })
}


export default {
  indexRecipes,
  createRecipe,
  updateRecipe,
  destroyRecipe,
  showRecipe
}

