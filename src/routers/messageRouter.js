import express from 'express';
import messageController from '../controllers/messageController.js';

const router = express.Router();

router.post('/global', messageController.postCreateMessage);
router.get('/:context', messageController.getMessagesByContext);
router.post('/:id/delete', messageController.deleteMessage);

export default router;
