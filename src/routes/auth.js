import "dotenv/config"
import { Router } from  'express'
import authController from "../controllers/authController"

const router = Router();

router.get('/logout', authController.logout)

router.post('/google', authController.google_auth)

export default router;