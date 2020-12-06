import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var InstaPhotoSchema = new Schema(
    {
        id: {type: String},
        caption: {type: String},
        media_type: {type: String},
        media_url: {type: String},
        permalink: {type: String},
        thumbnail_url: {type: String},
        timestamp: {type: String},
        username: {type: String},
        tags: {type: String},
    }, {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

InstaPhotoSchema.virtual('url').get(function() {
    return '/instaPhoto/' + this.id;
});

module.exports = mongoose.model('InstaPhoto', InstaPhotoSchema);
