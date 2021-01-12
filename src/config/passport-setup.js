// import passport from "passport"
// import User from "../models/user"
// import KEYS from "./keys"

// const GoogleStrategy = require("passport-google-oauth20").Strategy

// // Setup Google Strategy
// passport.serializeUser((user, done) => {
//     done(null, user._id)
// })

// passport.deserializeUser((_id, done) => {
//     console.log(_id)
//     User.findById(_id, function(err, user) {
//         done(err, user)
//     })
// })

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: KEYS.GOOGLE_ID,
//             clientSecret: KEYS.GOOGLE_SECRET,
//             callbackURL: `${KEYS.SERVER_URL}/auth/google/redirect`,
//         },
//         (accessToken, refreshToken, profile, done) => {
//             User.findOrCreate({
//                 id: profile.id
//             }, {
//                 email: profile._json.email,
//                 name: profile._json.name,
//                 imageUrl: profile._json.picture,
//                 admin: false
//             }, (err, user) => {
//                 if(err) {
//                     console.log(err)
//                 } else {
//                     return done(err, user);
//                 }
//             })
//         }
//     )
// );