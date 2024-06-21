// Middleware
import compression from './libs/compression.js';
import cookieParser from './libs/cookieParser.js';
import helmet from './libs/helmet.js';
import logger from './libs/morgan.js';
import upload from './libs/multer.js';
import rateLimit from './libs/rateLimit.js';
import expressMiddleware from './libs/express.js';
import errorHandler from './libs/errorHandler.js';

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
export {baseMiddleware, errorHandler, upload}
