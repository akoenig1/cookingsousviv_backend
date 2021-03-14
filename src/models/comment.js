import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CommentSchema = new Schema(
  {
    comment: {
      type: String, 
      required: true,
    },
    guestAuthor: {
      type: String, 
    },
    userAuthor: {
      type: Schema.Types.ObjectId,
    },
    recipe: {
      type: Schema.Types.ObjectId, 
      ref: 'Recipe',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model('Comment', CommentSchema);