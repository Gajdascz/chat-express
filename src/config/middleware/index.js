// Middleware
import errorHandler from './bundles/error.js';
import baseMiddleware from './bundles/base.js';
import registerUser from './bundles/userRegistration.js';
import userBasicToMemberUpgrade from './bundles/userBasicToMemberUpgrade.js';
import updateAvatar from './bundles/userAvatarUpdate.js';
import createMessage from './bundles/messageCreate.js';
// prettier-ignore
export {
  baseMiddleware, // Middleware that is immediately set on the express app
  registerUser, // Handles the user registration process
  updateAvatar, // Handles updating a users avatar image
  createMessage, // Handles the message creation process
  userBasicToMemberUpgrade, // Handles the upgrade process from basic to member user status
  errorHandler, // Forwards 404 errors and catches errors at the end of the middleware chain
};
