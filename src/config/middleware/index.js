// Middleware
import upload from './libs/imports/multer.js';
import errorHandler from './libs/errorHandler.js';
import bcryptHash from './libs/imports/bcryptHash.js';
import baseMiddleware from './libs/baseMiddleware.js';

// prettier-ignore
export { 
  baseMiddleware, // Middleware that is immediately set on the express app 
  errorHandler,   // Forwards 404 errors and catches errors at the end of the middleware chain
  upload,         // Multer function that stores form-uploaded images in memory
  bcryptHash      // Hashes and updates req.body.password
};
