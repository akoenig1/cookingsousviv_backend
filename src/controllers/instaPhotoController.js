import InstaPhoto from '../models/instaPhoto';

exports.instaPhoto_get_all = function(req, res, next) {
    InstaPhoto.find({})
    .sort('-timestamp')
    .exec(function(err, list_photos) {
        if(err) {return next(err)}
        //Successful, so send to frontend
        res.send({photos: list_photos});
    });
};

exports.instaPhoto_get = function(req, res, next) {
    const photo_id = req.body.id;
    
    InstaPhoto.findById(photo_id, (err) => {
        if(err) { return next(err); }
    }).exec()
    .then( (photo) => {
        res.json({ photo: photo });
    })
}