import mongoose from 'mongoose'
import urlStringify from '../helpers/urlStringify'

var Schema = mongoose.Schema;

var RecipeSchema = new Schema(
    {
        title: {type: String, required: true},
        intro: {type: String, required: true},
        ingredients: {type: String, required: true},
        directions: {type: String, required: true},
        instaPhoto: {type: Schema.Types.ObjectId, ref: 'InstaPhoto'},
        tags: {type: String},
        date: {type: Date},
        likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    }, {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

RecipeSchema.virtual('url').get(function() {
    return '/recipes/' + urlStringify(this.title);
});

module.exports = mongoose.model('Recipe', RecipeSchema);