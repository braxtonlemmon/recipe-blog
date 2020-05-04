import { Router } from 'express';
import commentsController from '../controllers/commentController';
import passport from 'passport';
const router = Router();

router.get('/',       commentsController.indexComments);
router.post('/',      commentsController.createComment);
router.delete('/:id', passport.authenticate('jwt', { session: false }), commentsController.destroyComment);

export default router;