import asyncHandler from 'express-async-handler';

import { FORM_SUBMITTER_CLIENT_SCRIPT, RECOVERY_QUESTIONS } from '../utils/constants.js';
import User from '../models/User.js';
import { registerUser } from '../config/middleware/index.js';
import { isLoggedIn } from '../config/middleware/libs/authentication/auth.js';
import { userLogin } from '../config/middleware/libs/authentication/userLogin.js';

const userController = {
  getLogin: (req, res, next) => {
    res.render('login', {});
  },
  postLogin: userLogin,
  getRegister: (req, res, next) => {
    res.render('register', { scripts: FORM_SUBMITTER_CLIENT_SCRIPT, recoveryQuestions: RECOVERY_QUESTIONS });
  },
  postRegister: [registerUser],
  getUser: [
    isLoggedIn,
    asyncHandler(async (req, res, next) => {
      const { username, status, avatar } = await User.findById(req.params.id).exec();
      res.render('user', { username, status, profileAvatar: avatar.profile });
    }),
  ],
  postLogout: (req, res, next) => req.logout((err) => (err ? next(err) : res.redirect('/'))),
};

export default userController;
