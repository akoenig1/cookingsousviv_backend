require('dotenv').config({ path: './.env' });

console.log('This script populates some test recipes to the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/cookingsousviv?retryWrites=true');

var async = require('async')
var Recipe = require('./src/models/recipe')

var mongoose = require('mongoose');
const mongoDB = `mongodb+srv://akoenig1:${process.env.MONGO_DB_PW}@cluster0.hhgkn.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var recipes = []

function recipeCreate(title, intro, ingredients, directions, instaPhoto, tags, cb) {
  recipedetail = { 
    title: title,
    intro: intro,
    ingredients: ingredients,
    directions: directions,
    instaPhoto: instaPhoto,
    tags: tags
  }

  var recipe = new Recipe(recipedetail);    
  recipe.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Recipe: ' + recipe);
    recipes.push(recipe)
    cb(null, recipe)
  }  );
}


function createRecipes(cb) {
    async.parallel([
        function(callback) {
          recipeCreate('Chocolate Chip Cookies', 'Some facts about cookies', '1tbsp cookies, 2tbsp chocolate', 'mix ingredients together and bake', '', 'cookies, chocolate, food', callback);
        },
        function(callback) {
            recipeCreate('Avocado Toast', 'Some facts about avocado toast', '1 avocado, 1 toast', 'spread avocado on toast', '', 'avocado, toast, food', callback);
        },
        function(callback) {
            recipeCreate('Matcha Latte', 'Some facts about matcha lattes', '1tbsp matcha, 1 cup oat milk', 'whisk to combine', '', 'matcha, latte, drinks', callback);
        },
        ],
        // optional callback
        cb);
}



async.series([
    createRecipes,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Recipes: '+recipes);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



