import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.post('/logout/', userController.postLogout);

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/:username', userController.getUser);
router.post('/:username/upgrade/basic-to-member', userController.postUpgradeToMember);
router.post('/:username/update/avatar', userController.postAvatarUpdate);

export default router;
