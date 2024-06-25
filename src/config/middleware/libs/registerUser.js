import asyncHandler from 'express-async-handler';
import upload from './imports/multer.js';
import { userRegistrationMiddleware } from './validation/definitions/user.js';

const registerUser = [
  ...userRegistrationMiddleware,
  upload.single('avatar'),
  asyncHandler(async (req, res, next) => {
    console.log(req);
    const {
      username,
      password,
      confirmPassword,
      recoveryQuestion,
      recoveryQuestionAnswer,
      email,
      firstName,
      lastName,
    } = req.body;
    const avatar = req.file;
    return res.status(200).json({ message: 'ok' });
  }),
];

export default registerUser;
