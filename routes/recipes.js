import { Router } from 'express';
import recipeController from '../controllers/recipeController';

const router = Router();

// All recipes
router.get('/',         recipeController.indexRecipes);

router.post('/',        recipeController.createRecipe);

router.put('/:id',      recipeController.updateRecipe);

router.delete('/:id',   recipeController.destroyRecipe);

router.get('/:id',      recipeController.showRecipe);

export default router;