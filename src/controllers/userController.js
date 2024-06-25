import asyncHandler from 'express-async-handler';
import { FORM_SUBMITTER_CLIENT_SCRIPT, RECOVERY_QUESTIONS } from '../utils/constants.js';
import registerUser from '../config/middleware/libs/registerUser.js';

const userController = {
  getLogin: (req, res, next) => {
    res.render('login', {});
  },
  postLogin: (req, res, next) => {},
  getRegister: (req, res, next) => {
    res.render('register', {
      scripts: FORM_SUBMITTER_CLIENT_SCRIPT,
      recoveryQuestions: RECOVERY_QUESTIONS,
    });
  },
  postRegister: [registerUser],
};

export default userController;
