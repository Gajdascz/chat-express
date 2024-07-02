import compression from '../core/compression.js';
import cookieParser from '../core/cookieParser.js';
import helmet from '../core/helmet.js';
import logger from '../core/morgan.js';
import rateLimit from '../core/rateLimit.js';
import expressMiddleware from '../core/express.js';
import session from '../core/expressSession.js';
import passport from '../authentication/passport.js';
import addUserToLocals from '../authentication/addUserToLocals.js';

// prettier-ignore
export default [
  compression,            // Compresses responses to save bandwidth
  helmet,                 // Adds security headers requests
  logger,                 // Logs incoming requests
  rateLimit,              // Limits repeated requests to public APIs and endpoints
  session,                // Sets the express-session configuration
  ...expressMiddleware,   // Parses JSON and URL-encoded data, serves static files
  cookieParser,           // Parses cookies attached to the client request
  passport.session(),     // Allows passport to maintain app session
  addUserToLocals,        // Sets the req.user object from authentication and adds it to res.locals.currentUser for easy view access
];
