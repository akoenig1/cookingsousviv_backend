import InstaPhoto from '../models/instaPhoto';

exports.instaPhoto_get = function(req, res, next) {
    InstaPhoto.find({})
    .sort('-timestamp')
    .exec(function(err, list_photos) {
        if(err) {return next(err)}
        //Successful, so send to frontend
        res.send({photos: list_photos});
    });
};