import axios from "axios"
import 'dotenv/config';

// Call to Instagram Graph API to refresh long-lived Instagram User Access Token every week
async function updateInstaToken() {
  const instaToken = process.env.REACT_APP_INSTAGRAM_API_KEY;
  await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${instaToken}`)
  .then(res => {
    return res
  })
  .catch(err => {
    console.log(err)
  })
}

export default updateInstaToken