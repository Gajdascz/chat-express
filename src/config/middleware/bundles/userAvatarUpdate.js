import asyncHandler from 'express-async-handler';
import upload from '../core/multer.js';
import User from '../../../models/User.js';
import isLoggedIn from '../authentication/isLoggedIn.js';

export default [
  isLoggedIn,
  upload.single('avatar'),
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.user.username }).exec();
      if (!user) throw new Error(`Failed to find user with username: ${req.user.username}`);
      await user.setAvatar(req.file?.buffer, true);
      await user.save();
      return res.status(200).json({ redirect: user.url });
    } catch (err) {
      return res.status(400).json({ alertMsg: `Failed to update avatar: ${err}` });
    }
  }),
];
