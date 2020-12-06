import Recipe from '../models/recipe';
//import validator from 'express-validator';
import async from 'async';

// Display recipe create form on GET
exports.recipe_create_get = function(req, res, next) {

};

// Handle recipe create on POST
exports.recipe_create_post = function(req, res, next) {

};

// Display recipe delete form on GET
exports.recipe_delete_get = function(req, res, next) {

};

// Handle recipe delete on POST
exports.recipe_delete_post = function(req, res, next) {

};

// Display recipe update form on GET
exports.recipe_update_get = function(req, res, next) {

};

// Handle recipe update form on POST
exports.recipe_update_post = function(req, res, next) {

};

// Display list of all recipes
exports.recipe_list = function(req, res, next) {
    Recipe.find({}, 'title url intro ingredients directions tags')
    //.populate('title')
    .exec(function(err, list_recipes) {
        if(err) {return next(err)}
        //Successful, so send to frontend
        res.send({title: 'Recipes', recipe_list: list_recipes});
    });
};

// Display details page of one recipe
exports.recipe_detail = function(req, res, next) {
    Recipe.findById(req.params.id)
    .exec(function(err, recipe) {
        if(err) { return next(err) }
        if(recipe==null) { //No results
            var err = new Error('Recipe not found');
            err.status = 404;
            return next(err);
        }
        //Successful, so send to frontend
        ///// NEED TO ADD IN INSTAPHOTO WHEN MODELS ARE LINKED /////
        res.send({title: recipe.title, intro: recipe.intro, ingredients: recipe.ingredients, directions: recipe.directions, /*instaPhoto: recipe.instaPhoto,*/ tags: recipe.tags });
    });
};