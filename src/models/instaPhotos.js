import axios from "axios"
import 'dotenv/config';
import 'regenerator-runtime';

// Request photo data from Instagram API. Wait for promise to resolve and return result.
async function getPhotos() {
    const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username"
    let user_id = process.env.REACT_APP_INSTAGRAM_USER_ID
    let token = process.env.REACT_APP_INSTAGRAM_API_KEY
    let photo_limit = 1000

    let photos = await axios.get(`https://graph.instagram.com/${user_id}/media?fields=${fields}&access_token=${token}&limit=${photo_limit}`)
    .then(res => {
        return res.data.data
    })
    .catch(err => {
        console.log(err)
    })

    return photos
}

// Call getPhotos asynchronously and assign resolved promise to instaPhotos constant for export
const instaPhotos = getPhotos()
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err)
    })

export default instaPhotos
