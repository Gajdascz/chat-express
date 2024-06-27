// Middleware
import errorHandler from './libs/errorBundle.js';
import baseMiddleware from './libs/baseBundle.js';
import registerUser from './libs/userRegistrationBundle.js';

// prettier-ignore
export {
  baseMiddleware, // Middleware that is immediately set on the express app
  registerUser, // Handles the entire user registration process
  errorHandler, // Forwards 404 errors and catches errors at the end of the middleware chain
};
