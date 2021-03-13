import getInstaPhotos from '../utils/getInstaPhotos';
import InstaPhoto from '../models/instaPhoto'

// Call updateInstaPhotos asynchronously and save new entry to mongoose database
async function updateInstaPhotos(req, res, next) {
  let photos = await getInstaPhotos()
              .then(res => {
                return res
              })
              .catch(err => {
                console.log(err)
              });

  if(photos != undefined) {
    photos.forEach(photo => {
      var instaPhoto = new InstaPhoto(
        {
          id: photo.id,
          caption: photo.caption,
          media_type: photo.media_type,
          media_url: photo.media_url,
          permalink: photo.permalink,
          thumbnail_url: photo.thumbnail_url,
          timestamp: photo.timestamp,
          username: photo.username,
        }
      )
      InstaPhoto.findOneAndUpdate(
        {id: instaPhoto.id}, 
        {
          caption: instaPhoto.caption,
          media_type: instaPhoto.media_type,
          media_url: instaPhoto.media_url,
          permalink: instaPhoto.permalink,
          thumbnail_url: instaPhoto.thumbnail_url,
          timestamp: instaPhoto.timestamp,
        }, 
        {upsert: true}, 
        (err) => {
          if(err) {return next(err); }
        }
      );
    });
  }
};

export default updateInstaPhotos;

