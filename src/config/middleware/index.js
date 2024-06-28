// Middleware
import errorHandler from './bundles/errorBundle.js';
import baseMiddleware from './bundles/baseBundle.js';
import registerUser from './bundles/userRegistrationBundle.js';

// prettier-ignore
export {
  baseMiddleware, // Middleware that is immediately set on the express app
  registerUser, // Handles the entire user registration process
  errorHandler, // Forwards 404 errors and catches errors at the end of the middleware chain
};
