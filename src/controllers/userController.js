import asyncHandler from 'express-async-handler';

import { FORM_SUBMITTER_CLIENT_SCRIPT, RECOVERY_QUESTIONS } from '../utils/constants.js';
import User from '../models/User.js';
import { registerUser } from '../config/middleware/index.js';
import { isLoggedIn } from '../config/middleware/authentication/auth.js';

import userLogin from '../config/middleware/authentication/core/userLogin.js';

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
      console.log(res.locals.currentUser);
      res.render('userProfile');
    }),
  ],
  postLogout: (req, res, next) => req.logout((err) => (err ? next(err) : res.redirect('/'))),
};

export default userController;
