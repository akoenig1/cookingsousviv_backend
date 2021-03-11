import checkAuth from '../middlewares/check-auth';
import { Router } from 'express';
const router = Router();

import {
  getRecipes,
  getCreateRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} from '../controllers/recipeController';

router.route('/').get(getRecipes);
router.route('/create').get(checkAuth, getCreateRecipe).post(checkAuth, createRecipe);
router.route('/:id/delete').post(checkAuth, deleteRecipe);
router.route('/:id/update').post(checkAuth, updateRecipe);

module.exports = router;