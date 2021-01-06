import Recipe from '../models/recipe';
import InstaPhoto from '../models/instaPhoto';

// Display recipe create form on GET
exports.recipe_create_get = function(req, res, next) {
    // Get all instaPhotos available to add to a recipe
    InstaPhoto.find(callback)
    .exec(function(err, instaPhotos) {
        if(err) { return next(err); }
        res.send({ title: 'Add Recipe', instaPhotoList: instaPhotos });
    });
};

// Handle recipe create on POST
exports.recipe_create_post = function(req, res, next) {
    // Create a recipe object
    var recipe = new Recipe(
        {
            title: req.body.title,
            intro: req.body.intro,
            ingredients: req.body.ingredients,
            directions: req.body.directions,
            tags: req.body.tags
        }
    );

    // Save recipe in databse
    recipe.save(function(err) {
        if(err) { return next(err); }
        // Successful, so redirect to book page
        res.send(recipe.url);
    });
};

// Display recipe delete form on GET
exports.recipe_delete_get = function(req, res, next) {
    // Find instaPhotos associated with this recipe so association can be removed
    InstaPhoto.find(callback)
    .exec(function(err, instaPhotos) {
        if(err) { return next(err); }
        res.send({ title: 'Add Recipe', instaPhotoList: instaPhotos });
    });
};

// Handle recipe delete on POST
exports.recipe_delete_post = async function(req, res, next) {
    const recipe_title = req.body.title
    Recipe.find( {title: recipe_title} ).exec()
    .then( (results) => {
        Recipe.findByIdAndRemove(results[0]._id, function deleteRecipe(err) {
            if(err) {return next(err)}
            res.send(`Successfully deleted post: ${recipe_title}`)
        });
    });
};

// Handle recipe update form on POST
exports.recipe_update_post = function(req, res, next) {
    // Find recipe object to update
    const recipe_id = req.body.id;

    Recipe.findByIdAndUpdate(recipe_id, {$set:req.body}, (err) => {
        if(err) {return next(err)}
    }).exec()
    .then(
        Recipe.findById(recipe_id).exec()
        .then( (result) => {
            res.send(result.url)
        })
    );
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