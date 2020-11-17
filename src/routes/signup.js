import { Router } from  'express';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/', (req, res, next) => {
    bcrpyt.hash(req.body.password, 10, (err, hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      }).save(err => {
        if (err) { 
          return next(err);
        };
        res.redirect("/");
      });
    });
  });

export default router;