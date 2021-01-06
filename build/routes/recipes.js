"use strict";

var _checkAuth = _interopRequireDefault(require("../helpers/check-auth"));

var _express = require("express");

var _recipeController = _interopRequireDefault(require("../controllers/recipeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // import controller modules

/// PUBLIC ROUTES ///
// GET request for all recipes. Recipe detail pages rendered in browser
router.get('/', _recipeController["default"].recipe_list); /// PROTECTED ROUTES ///
// Add protection middleware

router.use(_checkAuth["default"]); // GET request to create a new recipe

router.get('/create', _checkAuth["default"], _recipeController["default"].recipe_create_get); // POST request to create a new recipe

router.post('/create', _recipeController["default"].recipe_create_post); // GET request to delete a recipe

router.get('/:id/delete', _recipeController["default"].recipe_delete_get); // POST request to delete a recipe

router.post('/:id/delete', _recipeController["default"].recipe_delete_post); // POST request to update a recipe

router.post('/:id/update', _recipeController["default"].recipe_update_post);
module.exports = router;
//# sourceMappingURL=recipes.js.map