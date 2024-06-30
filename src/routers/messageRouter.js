import express from 'express';
import messageController from '../controllers/messageController.js';

const router = express.Router();

router.post('/global', messageController.createMessage);
router.get('/:context', messageController.getMessagesByContext);

export default router;
