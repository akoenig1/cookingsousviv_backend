import axios from "axios"
import 'dotenv/config';
import 'regenerator-runtime';

// Request photo data from Instagram API. Wait for promise to resolve and return result.
async function getInstaPhotos() {
  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username"
  let user_id = process.env.REACT_APP_INSTAGRAM_USER_ID
  let token = process.env.REACT_APP_INSTAGRAM_API_KEY
  let photo_limit = 100000

  let photos = await axios.get(`https://graph.instagram.com/${user_id}/media?fields=${fields}&access_token=${token}&limit=${photo_limit}`)
  .then(res => {
    return res.data.data
  })
  .catch(err => {
    console.log(err)
  })

  return photos
}

export default getInstaPhotos
