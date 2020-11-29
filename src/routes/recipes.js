import { Router } from 'express';
const router = Router();

// import controller modules
import recipe_controller from '../controllers/recipeController';



/// RECIPE ROUTES ///
// GET request to create a new recipe
router.get('/create', recipe_controller.recipe_create_get);

// POST request to create a new recipe
router.get('/create', recipe_controller.recipe_create_post);

// GET request to delete a recipe
router.get('/:id/delete', recipe_controller.recipe_delete_get);

// POST request to delete a recipe
router.get('/:id/delete', recipe_controller.recipe_delete_post);

// GET request to update a recipe
router.get('/:id/update', recipe_controller.recipe_update_get);

// POST request to update a recipe
router.get('/:id/update', recipe_controller.recipe_update_post);

// GET request for all recipes
router.get('/', recipe_controller.recipe_list);

// GET request for one recipe
router.get('/:id', recipe_controller.recipe_detail);

module.exports = router;