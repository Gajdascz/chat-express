import asyncHandler from 'express-async-handler';
import { FORM_SUBMITTER_CLIENT_SCRIPT, RECOVERY_QUESTIONS } from '../utils/constants.js';
import registerUser from '../config/middleware/libs/registerUser.js';
import User from '../models/User.js';
import passport from '../config/core/passport.js';

const userController = {
  getLogin: (req, res, next) => {
    res.render('login', {});
  },
  postLogin: (req, res, next) =>
    passport.authenticate('local', {
      successRedirect: `/`,
    }),
  getRegister: (req, res, next) => {
    res.render('register', { scripts: FORM_SUBMITTER_CLIENT_SCRIPT, recoveryQuestions: RECOVERY_QUESTIONS });
  },
  postRegister: [registerUser],
  getUser: asyncHandler(async (req, res, next) => {
    console.log(req.params.id);
    const { username, status, avatar } = await User.findById(req.params.id).exec();
    res.render('user', { username, status, profileAvatar: avatar.profile });
  }),
};

export default userController;
