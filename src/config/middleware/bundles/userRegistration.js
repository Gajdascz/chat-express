import asyncHandler from 'express-async-handler';
import upload from '../core/multer.js';

import User from '../../../models/User.js';
import { userRegistrationValidationChain } from '../validation/chains.js';

const registerUser = [
  // Multer parses submitted form data and uses memory storage
  upload.single('avatar'),
  // Executes field validation on provided form data
  ...userRegistrationValidationChain,
  asyncHandler(async (req, res, next) => {
    delete req.body.confirmPassword;
    if (req.validationErrors) return res.status(400).json({ errors: req.validationErrors });
    const { email, firstName, lastName, username, password } = req.body;
    const user = new User({ email, firstName, lastName, username });
    if (!(await user.setPassword(password))) throw new Error(`Failed to setPassword on user document`);
    if (!(await user.setAvatar(req.file?.buffer, false))) throw new Error(`Failed to setAvatar on user document`);
    await user.save();
    return res.status(201).json({ redirect: `/user/login` });
  }),
];

export default registerUser;
