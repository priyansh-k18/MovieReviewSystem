import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { commentReply, getAllComment, getReplies, movieComment } from '../controllers/comment-controller.js';

const router = express.Router({ mergeParams: true });


router.post('/' , authMiddleware, movieComment);
router.get('/', getAllComment);


router.post('/:commentId/replies',authMiddleware, commentReply);
router.get('/:commentId/replies', getReplies);

export default router;

