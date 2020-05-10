import { Router } from 'express';
import authController from '../controllers/authController';
const router = Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;