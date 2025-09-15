import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { commentReply, getAllComment, movieComment } from '../controllers/comment-controller.js';

const router = express.Router({ mergeParams: true });


router.post('/' , authMiddleware, movieComment);
router.get('/', getAllComment);
router.post('/:commentId',authMiddleware, commentReply);

export default router;
