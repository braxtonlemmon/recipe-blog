import { Router } from 'express';
import userController from '../controllers/userController';
import passport from 'passport';

const router = Router();

router.get('/me',       passport.authenticate('jwt', { session: false }), userController.getUser);
router.post('/',        userController.createUser);
router.put('/:id',      userController.updateUser);
router.delete('/:id',   userController.destroyUser);
router.get('/:id',      userController.showUser);
export default router;