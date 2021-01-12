import "dotenv/config"
import { Router } from  'express'
// import jwt from 'jsonwebtoken'
import authController from "../controllers/authController"
// import passport from "passport"
// import KEYS from "../config/keys"

const router = Router();

// router.get('/login/failed', authController.login_failed)

router.get('/logout', authController.logout)

router.post('/google', authController.google_auth)

// router.get('/google/redirect', passport.authenticate("google", 
//     {
//         failureRedirect: '/auth/login/failed',
//         session: false 
//     }
//     ), (req, res) => {
//         req.logIn(req.user, (err) => {
//             if(err) {
//                 console.log(err)
//             } else {
//                 try {
//                     let token = jwt.sign(
//                         {id: req.user.id}, 
//                         process.env.JWT_SECRET, 
//                         {expiresIn: '1h'}
//                     )
//                     res.header('Authorization', token).redirect(`${KEYS.HOME_PAGE_URL}`)
//                 } catch(err) {
//                     console.log(err);
//                 } 
//             }
//         })
//     }
// )

export default router;