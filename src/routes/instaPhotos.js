import { Router } from  'express';
const router = Router();
import instaPhoto_controller from '../controllers/instaPhotoController';

router.get('/', instaPhoto_controller.instaPhoto_get);

export default router;
