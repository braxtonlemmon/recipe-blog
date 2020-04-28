import { Router } from 'express';
import recipeController from '../controllers/recipeController';

const router = Router();

// All recipes
router.get('/',         recipeController.indexRecipes);

router.get('/new',      recipeController.newRecipe);

router.post('/',        recipeController.createRecipe);

router.get('/:id/edit', recipeController.editRecipe);

router.put('/:id',      recipeController.updateRecipe);

router.delete('/:id',   recipeController.destroyRecipe);

router.get('/:id',      recipeController.showRecipe);

export default router;