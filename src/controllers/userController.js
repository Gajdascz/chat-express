import asyncHandler from 'express-async-handler';
import { FORM_SUBMITTER_CLIENT_SCRIPT, RECOVERY_QUESTIONS } from '../utils/constants.js';

const userController = {
  getLogin: (req, res, next) => {
    res.render('login', {
      scripts: FORM_SUBMITTER_CLIENT_SCRIPT,
    });
  },
  postLogin: (req, res, next) => {},
  getRegister: (req, res, next) => {
    res.render('register', {
      scripts: FORM_SUBMITTER_CLIENT_SCRIPT,
      recoveryQuestions: RECOVERY_QUESTIONS,
    });
  },
  postRegister: (req, res, next) => {},
};

export default userController;
