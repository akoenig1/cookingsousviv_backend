import checkAuth from '../middlewares/checkAuth';
import { Router } from 'express';
const router = Router();

import {
  getRecipe,
  getRecipes,
  getCreateRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  toggleLike,
  addComment,
  deleteComment,
} from '../controllers/recipeController';

router.route('/').get(getRecipes);
router.route('/:id').get(getRecipe);
router.route('/create').get(checkAuth, getCreateRecipe).post(checkAuth, createRecipe);
router.route('/:id/delete').post(checkAuth, deleteRecipe);
router.route('/:id/update').post(checkAuth, updateRecipe);
router.route('/:id/toggleLike').get(checkAuth, toggleLike);
router.route('/:id/comments').post(addComment);
router.route('/:id/comments/:commentId').delete(checkAuth, deleteComment);

module.exports = router;