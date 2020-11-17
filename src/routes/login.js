import { Router } from  'express';
import passport from 'passport';

const router = Router();

router.get('/', (req, res) => {
    return res.send('index', { user: req.user });
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

export default router;