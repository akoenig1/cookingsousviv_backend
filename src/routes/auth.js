import "dotenv/config"
import { Router } from  'express'
const router = Router();

import {
  logout,
  googleAuth,
} from "../controllers/authController"

router.route('/logout').get(logout);
router.route('/google').post(googleAuth);

export default router;