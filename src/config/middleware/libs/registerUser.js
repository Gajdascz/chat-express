import asyncHandler from 'express-async-handler';
import upload from './imports/multer.js';
import { userRegistrationMiddleware } from './validation/definitions/user.js';
import User from '../../../models/User.js';
import { uploadAvatar } from '../../core/cloudinary.js';

const registerUser = [
  upload.single('avatar'),
  ...userRegistrationMiddleware,
  asyncHandler(async (req, res, next) => {
    if (req.validationErrors) return res.status(400).json({ errors: req.validationErrors });
    const user = new User({ ...req.body });
    const avatar = await uploadAvatar(user.id, req.file);
    await user.$set('avatar', avatar).save();
    return res.status(201).json({ redirect: `/` });
  }),
];

export default registerUser;
