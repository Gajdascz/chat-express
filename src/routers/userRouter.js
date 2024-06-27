import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.post('/logout', userController.postLogout);

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/recover');
router.post('/recover');
router.get('/recover/:id');
router.post('/recover/:id');

router.get('/:username', userController.getUser);

export default router;
