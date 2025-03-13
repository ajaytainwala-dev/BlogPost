import express from 'express';
import { getComments, createComment ,deleteComment} from '../controllers/commentController.js';
import authMiddleware from '../middlewares/middleware.js';
import { create } from 'domain';
const router = express.Router();

router.get('/api/comments/:userID/:postId', getComments);
router.post('/api/comment/:postId', authMiddleware, createComment);
router.delete('/api/comment/:commentId', authMiddleware, deleteComment);

export default router;