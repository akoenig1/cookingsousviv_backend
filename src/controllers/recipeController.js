import Recipe from '../models/recipe';
import InstaPhoto from '../models/instaPhoto';

// Display recipe create form on GET
exports.getCreateRecipe = function(req, res, next) {
    // Get all instaPhotos available to add to a recipe
    InstaPhoto.find(callback)
    .exec(function(err, instaPhotos) {
        if(err) { return next(err); }
        res.send({ title: 'Add Recipe', instaPhotoList: instaPhotos });
    });
};

// Handle recipe create on POST
exports.createRecipe = async function(req, res, next) {
    // Create a recipe object
    const recipe = new Recipe(
        {
            title: req.body.title,
            intro: req.body.intro,
            ingredients: req.body.ingredients,
            directions: req.body.directions,
            tags: req.body.tags,
            instaPhoto: req.body.photo._id
        }
    );

    // Save recipe in databse
    recipe.save(function(err) {
        if(err) { return next(err); }
        // Successful, so redirect to new recipe page
        res.json( {url: recipe.url} );
    });
};

// Handle recipe delete on POST
exports.deleteRecipe = async function(req, res, next) {
    const recipe_title = req.body.title
    Recipe.find( {title: recipe_title} ).exec()
    .then( (results) => {
        Recipe.findByIdAndRemove(results[0]._id, function deleteRecipe(err) {
            if(err) {return next(err)}
            res.json(`Successfully deleted post: ${recipe_title}`)
        });
    });
};

// Handle recipe update form on POST
exports.updateRecipe = function(req, res, next) {
    // Find recipe object to update
    const recipe_id = req.body.id;

    Recipe.findByIdAndUpdate(recipe_id, {$set:req.body}, (err) => {
        if(err) {return next(err)}
    }).exec()
    .then(
        Recipe.findById(recipe_id).exec()
        .then( (result) => {
            res.json( {url: result.url} )
        })
    );
};

// Display list of all recipes
exports.getRecipes = function(req, res, next) {
    Recipe.find({}, 'title url intro ingredients directions instaPhoto tags')
    .populate('instaPhoto')
    .exec(function(err, list_recipes) {
        if(err) {return next(err)}
        //Successful, so send to frontend
        res.send({title: 'Recipes', recipe_list: list_recipes});
    });
};