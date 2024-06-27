import asyncHandler from 'express-async-handler';
import upload from './imports/multer.js';

import User from '../../../models/User.js';
import processValidationResult from './validation/core/processValidationResult.js';
import { userRegistrationValidationChain } from './validation/index.js';

const registerUser = [
  // Multer parses submitted form data and uses memory storage
  upload.single('avatar'),
  // Executes field validation on provided form data
  ...userRegistrationValidationChain,
  // Checks validationResult and parses errors (req.validationErrors)
  processValidationResult,
  // Check if there are validation errors and proceed accordingly
  (req, res, next) => {
    if (req.validationErrors) return res.status(400).json({ errors: req.validationErrors });
    delete req.body.confirmPassword;
    next();
  },
  asyncHandler(async (req, res, next) => {
    const { email, firstName, lastName, username, password, recoveryQuestion, recoveryQuestionAnswer } = req.body;
    const user = new User({ email, firstName, lastName, username });
    if (!(await user.setPassword(password))) throw new Error(`Failed to setPassword on user document`);
    if (!(await user.setRecovery(recoveryQuestion, recoveryQuestionAnswer)))
      throw new Error(`Failed to setRecovery on user document`);
    if (!(await user.setAvatar(req.file))) throw new Error(`Failed to setAvatar on user document`);
    await user.save();
    return res.status(201).json({ redirect: `/user/login` });
  }),
];

export default registerUser;
