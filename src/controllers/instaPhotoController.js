import InstaPhoto from '../models/instaPhoto';
import asyncHandler from '../middlewares/asyncHandler';

exports.getInstaPhotos = asyncHandler(async (req, res, next) => {
  await InstaPhoto.find({})
  .sort('-timestamp')
  .exec(function(err, list_photos) {
    if(err) {return next(err)}
    res.send({photos: list_photos});
  });
});

exports.getInstaPhoto = asyncHandler(async (req, res, next) => {
  const photo_id = req.body.id;
  
  await InstaPhoto.findById(photo_id, (err) => {
    if(err) { return next(err); }
  }).exec()
  .then( (photo) => {
    res.json({ photo: photo });
  });
});