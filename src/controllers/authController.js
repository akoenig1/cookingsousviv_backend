import passport from "passport"
import KEYS from "../config/keys"

exports.login_failed = function(req, res) {
    console.log('failed')
    res.status(401).json({
        success: false,
        message: "Login failed"
    })
}

exports.logout = function(req, res) {
    req.logout()
    res.redirect(`${KEYS.HOME_PAGE_URL}`)
}

exports.google_auth = passport.authenticate("google", 
    { 
        scope: ['profile', 'email'],
        prompt: 'select_account'
    }
)

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