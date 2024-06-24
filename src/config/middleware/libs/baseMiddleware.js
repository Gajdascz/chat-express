import compression from './imports/compression.js';
import cookieParser from './imports/cookieParser.js';
import helmet from './imports/helmet.js';
import logger from './imports/morgan.js';
import rateLimit from './imports/rateLimit.js';
import expressMiddleware from './imports/express.js';
import session from './imports/expressSession.js';

// prettier-ignore
export default [
  compression,          // Compresses responses to save bandwidth
  helmet,               // Adds security headers requests
  logger,               // Logs incoming requests
  rateLimit,            // Limits repeated requests to public APIs and endpoints
  session,              // Sets the express-session configuration
  ...expressMiddleware, // Parses JSON and URL-encoded data, serves static files
  cookieParser,         // Parses cookies attached to the client request
];
