import Comment from '../models/comment';
import InstaPhoto from '../models/instaPhoto';
import Recipe from '../models/recipe';
import User from '../models/user';
import asyncHandler from '../middlewares/asyncHandler';
import checkAuth from '../middlewares/checkAuth';

// Display recipe create form on GET
exports.getCreateRecipe = asyncHandler(async (req, res, next) => {
  // Get all instaPhotos available to add to a recipe
  await InstaPhoto.find(callback)
  .exec(function(err, instaPhotos) {
    if(err) { return next(err); }
    res.status(200).send({ title: 'Add Recipe', instaPhotoList: instaPhotos });
  });
});

// Handle recipe create on POST
exports.createRecipe = asyncHandler (async (req, res, next) => {
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
  await recipe.save(function(err) {
    if(err) { return next(err); }
    // Successful, so redirect to new recipe page
    res.status(200).json( {url: recipe.url} );
  });
});

// Handle recipe delete on POST
exports.deleteRecipe = asyncHandler (async (req, res, next) => {
  const recipe_title = req.body.title
  await Recipe.find( {title: recipe_title} ).exec()
  .then( asyncHandler (async (results) => {
    await Recipe.findByIdAndRemove(results[0]._id, function deleteRecipe(err) {
      if(err) {return next(err)}
      res.status(200).json(`Successfully deleted post: ${recipe_title}`)
    });
  }));
});

// Handle recipe update form on POST
exports.updateRecipe = asyncHandler (async (req, res, next) => {
  // Find recipe object to update
  const recipe_id = req.body.id;

  await Recipe.findByIdAndUpdate(recipe_id, {$set:req.body}, (err) => {
    if(err) {return next(err)}
  }).exec()
  .then(
    Recipe.findById(recipe_id).exec()
    .then( (result) => {
      res.status(200).json( {url: result.url} )
    })
  );
});

// Display list of all recipes
exports.getRecipes = asyncHandler (async (req, res, next) => {
  await Recipe.find({}, 'title url intro ingredients directions instaPhoto tags')
  .populate('instaPhoto')
  .exec(function(err, list_recipes) {
    if(err) {return next(err)}
    //Successful, so send to frontend
    res.status(200).send({title: 'Recipes', recipe_list: list_recipes});
  });
});

// Display a single recipe
exports.getRecipe = asyncHandler (async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id)
    .populate({
      path: 'comments',
      select: 'comment guestAuthor',
      populate: {
        path: 'userAuthor',
        select: 'name image',
      }
    })
    .lean()
    .exec();

  if(!recipe) {
    return next({
      message: `No recipe found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  // Is there a logged in user?
  if(req.headers.authorization) {
    checkAuth(req, res, next);
    // Did the logged in user like this recipe?
    const likes = recipe.likes.map((like) => like.toString());
    recipe.isLiked = likes.includes(req.userData.id);

    // Did the logged in user comment on this recipe?
    recipe.comments.forEach((comment) => {
      comment.isCommentMine = false;

      if(comment.userAuthor) {
        const userStr = comment.userAuthor._id.toString();
        if(userStr === req.userData.id) {
          comment.isCommentMine = true;
        }
      }
    });
  }

  res.status(200).json({ success: true, data: recipe });
})

exports.toggleLike = asyncHandler(async (req, res, next) => {
  console.log(req.userData.id)
  const recipe = await Recipe.findById(req.params.id);

  // Check that recipe exists
  if(!recipe) {
    return next({
      message: `No recipe found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  // Check that a user is logged in
  if(!req.userData.id) {
    return next({
      message: `You must be logged in to like a post`,
      statusCode: 404,
    })
  }

  // Toggle like
  if(recipe.likes.includes(req.userData.id)) {
    console.log(`Unliking for ${req.userData.id}`)
    const index = recipe.likes.indexOf(req.userData.id);
    recipe.likes.splice(index, 1);
    recipe.likesCount -= 1;
    await recipe.save();
  } else {
    console.log(`Liking for ${req.userData.id}`)
    recipe.likes.push(req.userData.id);
    recipe.likesCount += 1;
    await recipe.save();
  }

  res.status(200).json({ success: true, data: {} });
});

exports.addComment = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  const registeredUser = req.body.registeredUser;

  // Check that recipe exists
  if(!recipe) {
    return next({
      message: `No recipe found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  // Create comment for logged in user author
  if(registeredUser) {
    var newComment = await Comment.create({
      userAuthor: req.body.userInfo,
      recipe: req.params.id,
      comment: req.body.comment,
    });
  // Create comment for guest author
  } else {
    var newComment = await Comment.create({
      guestAuthor: req.body.userInfo,
      recipe: req.params.id,
      comment: req.body.comment,
    });
  }

  recipe.comments.push(newComment._id);
  recipe.commentsCount += 1;
  await recipe.save();

  newComment = await newComment
    .populate({ path: 'user', select: 'userAuthor guestAuthor' })
    .execPopulate();
  
  res.status(200).json({ success: true, data: newComment });
})

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if(!recipe) {
    return next({
      message: `No recipe found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  const comment = await Comment.findOne({
    _id: req.params.commentId,
    recipe: req.params.id,
  });

  if(!comment) {
    return next({
      message: `No comment found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  if(comment.userAuthor._id.toString() !== req.userData.id) {
    return next({
      message: 'You are not authorized to delete this comment',
      statusCode: 401,
    });
  }

  const index = recipe.comments.indexOf(comment._id);
  recipe.comments.splice(index, 1);
  recipe.commentsCount -= 1;
  await recipe.save();

  await comment.remove();

  res.status(200).json({ success: true, data: {} });
})