import { Router } from 'express';
import commentsController from '../controllers/commentController';

const router = Router();

router.get('/',       commentsController.indexComments);
router.get('/new',    commentsController.newComment);
router.post('/',      commentsController.createComment);
router.delete('/:id', commentsController.destroyComment);

export default router;