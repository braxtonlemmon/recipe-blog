import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/',        userController.createUser);
router.put('/:id',      userController.updateUser);
router.delete('/:id',   userController.destroyUser);
router.get('/:id',      userController.showUser);

export default router;