import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

export default router;
