import { Router } from  'express';
const router = Router();

import {
  getInstaPhotos,
  getInstaPhoto,
} from '../controllers/instaPhotoController';

router.route('/').get(getInstaPhotos);
router.route('/:id').get(getInstaPhoto);

export default router;
