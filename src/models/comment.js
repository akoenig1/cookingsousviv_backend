import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        comment: {type: String, required: true},
        author: {type: String, required: true},
        date: {type: Date},
        recipe: {type: Schema.Types.ObjectId, ref: 'Recipe'}
    }
)

module.exports = mongoose.model('Comment', CommentSchema);