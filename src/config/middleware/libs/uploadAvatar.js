import cloudinary from '../../core/cloudinary';
import asyncHandler from 'express-async-handler';
import upload from './imports/multer';
import User from '../../../models/User.js';
import { DEFAULT_AVATAR_PUBLIC_ID } from '../../../utils/constants.js';

export default [
  upload.single('avatar'),
  asyncHandler(async (req, res, next) => {
    if (!req.file) return res.status(400).json({ message: 'No image filed provided' });
    if (req.params.id) {
      const user = await User.findById(req.params.id).exec();
      if (!user)
        return res
          .status(404)
          .json({ message: 'User id in request parameters but failed to find user with a matching id.' });
      else {
        try {
          if (user.avatar.publicId && user.avatar.publicId !== DEFAULT_AVATAR_PUBLIC_ID)
            await cloudinary.uploader.destroy(user.avatar.publicId);
        } catch (err) {
          return res.status(500).json({ message: `Could not delete user's original avatar image` });
        }
      }
    }
    try {
      const result = await cloudinary.uploader.upload(req.file, {
        resource_type: 'image',
        folder: 'membersOnly',
      });
    } catch (err) {
      return res.status(500).json({ message: 'Error uploading avatar' });
    }
  }),
];
