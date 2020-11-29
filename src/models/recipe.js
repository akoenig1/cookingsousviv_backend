import mongoose from 'mongoose'
import urlStringify from '../helpers/urlStringify'

var Schema = mongoose.Schema;

var RecipeSchema = new Schema(
    {
        title: {type: String, required: true},
        intro: {type: String, required: true},
        ingredients: {type: String, required: true},
        directions: {type: String, required: true},
        //// Need to link instaPhotos
        instaPhoto: {},
        tags: {type: String},
    }, {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

RecipeSchema.virtual('url').get(function() {
    return '/recipes/' + urlStringify(this.title);
});

module.exports = mongoose.model('Recipe', RecipeSchema);