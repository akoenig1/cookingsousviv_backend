"use strict";

var _recipe = _interopRequireDefault(require("../models/recipe"));

var _instaPhoto = _interopRequireDefault(require("../models/instaPhoto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Display recipe create form on GET
exports.recipe_create_get = function (req, res, next) {
  // Get all instaPhotos available to add to a recipe
  _instaPhoto["default"].find(callback).exec(function (err, instaPhotos) {
    if (err) {
      return next(err);
    }

    res.send({
      title: 'Add Recipe',
      instaPhotoList: instaPhotos
    });
  });
}; // Handle recipe create on POST


exports.recipe_create_post = function (req, res, next) {
  // Create a recipe object
  var recipe = new _recipe["default"]({
    title: req.body.title,
    intro: req.body.intro,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    tags: req.body.tags
  }); // Save recipe in databse

  recipe.save(function (err) {
    if (err) {
      return next(err);
    } // Successful, so redirect to book page


    res.send(recipe.url);
  });
}; // Display recipe delete form on GET


exports.recipe_delete_get = function (req, res, next) {
  // Find instaPhotos associated with this recipe so association can be removed
  _instaPhoto["default"].find(callback).exec(function (err, instaPhotos) {
    if (err) {
      return next(err);
    }

    res.send({
      title: 'Add Recipe',
      instaPhotoList: instaPhotos
    });
  });
}; // Handle recipe delete on POST


exports.recipe_delete_post = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var recipe_title;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            recipe_title = req.body.title;

            _recipe["default"].find({
              title: recipe_title
            }).exec().then(function (results) {
              _recipe["default"].findByIdAndRemove(results[0]._id, function deleteRecipe(err) {
                if (err) {
                  return next(err);
                }

                res.send("Successfully deleted post: ".concat(recipe_title));
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // Handle recipe update form on POST


exports.recipe_update_post = function (req, res, next) {
  // Find recipe object to update
  var recipe_id = req.body.id;

  _recipe["default"].findByIdAndUpdate(recipe_id, {
    $set: req.body
  }, function (err) {
    if (err) {
      return next(err);
    }
  }).exec().then(_recipe["default"].findById(recipe_id).exec().then(function (result) {
    res.send(result.url);
  }));
}; // Display list of all recipes


exports.recipe_list = function (req, res, next) {
  _recipe["default"].find({}, 'title url intro ingredients directions tags') //.populate('title')
  .exec(function (err, list_recipes) {
    if (err) {
      return next(err);
    } //Successful, so send to frontend


    res.send({
      title: 'Recipes',
      recipe_list: list_recipes
    });
  });
};
//# sourceMappingURL=recipeController.js.map