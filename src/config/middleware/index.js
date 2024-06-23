// Middleware
import compression from './libs/compression.js';
import cookieParser from './libs/cookieParser.js';
import helmet from './libs/helmet.js';
import logger from './libs/morgan.js';
import upload from './libs/multer.js';
import rateLimit from './libs/rateLimit.js';
import expressMiddleware from './libs/express.js';
import errorHandler from './libs/errorHandler.js';
import bcryptHash from './libs/bcryptHash.js';

// prettier-ignore
const baseMiddleware = [
  compression,          // Compresses responses to save bandwidth
  helmet,               // Adds security headers requests
  logger,               // Logs incoming requests
  rateLimit,            // Limits repeated requests to public APIs and endpoints
  ...expressMiddleware, // Parses JSON and URL-encoded data, serves static files
  cookieParser,         // Parses cookies attached to the client request
];

// prettier-ignore
export { 
  baseMiddleware, // Middleware that is immediately set on the express app 
  errorHandler,   // Forwards 404 errors and catches errors at the end of the middleware chain
  upload,         // Multer function that stores form-uploaded images in memory
  bcryptHash      // Hashes and updates req.body.password
};
