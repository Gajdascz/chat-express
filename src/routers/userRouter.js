import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/recover');
router.post('/recover');
router.get('/recover/:id');
router.post('/recover/:id');

router.get('/:id', userController.getUser);

export default router;
