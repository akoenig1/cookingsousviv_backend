import mongoose from 'mongoose';
import urlStringify from '../helpers/urlStringify';

const Schema = mongoose.Schema;
const RecipeSchema = new Schema(
  {
    title: {
      type: String, 
      required: true,
    },
    intro: {
      type: String, 
      required: true,
    },
    ingredients: {
      type: String, 
      required: true,
    },
    directions: {
      type: String, 
      required: true,
    },
    instaPhoto: {
      type: Schema.Types.ObjectId, 
      ref: 'InstaPhoto',
    },
    tags: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [{
      type: Schema.Types.ObjectId, 
      ref: 'User',
    }],
    likesCount: {
      type: Number,
      default: 0,
    },
    comments: [{
      type: Schema.Types.ObjectId, 
      ref: 'Comment',
    }],
    commentsCount: {
      type: Number,
      default: 0,
    }
  }, {
    toObject: { 
      virtuals: true,
    },
    toJSON: { 
      virtuals: true,
    },
  }
);

RecipeSchema.virtual('url').get(function() {
    return '/recipes/' + urlStringify(this.title);
});

module.exports = mongoose.model('Recipe', RecipeSchema);