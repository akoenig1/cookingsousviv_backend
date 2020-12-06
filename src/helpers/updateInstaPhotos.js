import getInstaPhotos from './getInstaPhotos';
import InstaPhoto from '../models/instaPhoto'

// Call instaPhotoGetter asynchronously and save received values to mongoose database
async function updateInstaPhotos(req, res, next) {
    let photos = await getInstaPhotos()
                .then(res => {
                    return res
                })
                .catch(err => {
                    console.log(err)
                });

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
                //tags: req.body.id,
            }
        )
        InstaPhoto.exists({ id: instaPhoto.id })
        .then(exists => {
            if(!exists) {
                instaPhoto.save(function(err) {
                    if(err) { return next(err); }
                });
            }
        })
        .catch(err => {
            console.log(err);
        });

    });
};

export default updateInstaPhotos;

