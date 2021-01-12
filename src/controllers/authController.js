//import passport from "passport"
import jwt from 'jsonwebtoken'
import User from "../models/user"
import KEYS from "../config/keys"
const gal = require("google-auth-library")

const client = new gal.OAuth2Client(KEYS.GOOGLE_ID)

// exports.login_failed = function(req, res) {
//     console.log('failed')
//     res.status(401).json({
//         success: false,
//         message: "Login failed"
//     })
// }

exports.logout = function(req, res) {
    req.logout()
    res.redirect(`${KEYS.HOME_PAGE_URL}`)
}

exports.google_auth = (req, res) => {
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, audience: KEYS.GOOGLE_ID})
    .then(result => {
        const profile = result.payload;
        if(profile.email_verified) {
            User.findOrCreate({
                id: profile.sub
            }, {
                email: profile.email,
                name: profile.name,
                imageUrl: profile.picture,
                admin: false
            }, (err, user) => {
                if(err) {
                    console.log(err)
                } else {
                    const token = jwt.sign({_id: user._id}, KEYS.JWT_SECRET, {expiresIn: '1d'});
                    const {_id, name, email, admin} = user;
                    res.json({
                        token,
                        user: {_id, name, email, admin}
                    })
                }
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

// exports.google_auth = passport.authenticate("google", 
//     { 
//         scope: ['profile', 'email'],
//         prompt: 'select_account'
//     }
// )

// exports.google_auth_redirect = passport.authenticate("google", 
//{
//     failureRedirect: '/auth/login/failed',
//     session: false 
// }
// ), (req, res) => {
// console.log("here: " + req.user)
// var token = req.user.id;
// res.redirect(`${KEYS.HOME_PAGE_URL}?id=` + token);
// })