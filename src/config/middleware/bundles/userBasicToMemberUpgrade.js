import asyncHandler from 'express-async-handler';
import User from '../../../models/User.js';
import isLoggedIn from '../authentication/isLoggedIn.js';
import { USER_STATUSES } from '../../../utils/constants.js';
import { userUpgradeValidationChain } from '../validation/chains.js';

export default [
  isLoggedIn,
  ...userUpgradeValidationChain,
  asyncHandler(async (req, res, next) => {
    if (req.validationErrors) return res.status(400).json({ errors: req.validationErrors });
    await User.findByIdAndUpdate(req.user._id, { status: USER_STATUSES.MEMBER }).exec();
    return res.status(200).json({ alertMsg: `Congratulations you're now a certified member!`, redirect: req.user.url });
  }),
];
