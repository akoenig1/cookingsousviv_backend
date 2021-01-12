import checkAuth from '../helpers/check-auth';
import { Router } from 'express';
const router = Router();

// import controller modules
import recipe_controller from '../controllers/recipeController';

/// PUBLIC ROUTES ///
// GET request for all recipes. Recipe detail pages rendered in browser
router.get('/', recipe_controller.recipe_list);

/// PROTECTED ROUTES ///
// Add protection middleware
router.use(checkAuth); 

// GET request to create a new recipe
router.get('/create', recipe_controller.recipe_create_get);

// POST request to create a new recipe
router.post('/create', recipe_controller.recipe_create_post);

// POST request to delete a recipe
router.post('/:id/delete', recipe_controller.recipe_delete_post);

// POST request to update a recipe
router.post('/:id/update', recipe_controller.recipe_update_post);



module.exports = router;