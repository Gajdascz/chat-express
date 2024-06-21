// Core
import express from 'express';
import { mongoConnect } from './config/core/db.js';
import initHbs from './config/core/hbs.js';

// Middleware
import { baseMiddleware, errorHandler } from './config/middleware/index.js';

// Utils
import { getDebug } from './utils/helpers.js';

// Routers
import indexRouter from './routers/indexRouter.js';

// 0. Load environment variables into process.env
import './config/core/dotenv.js';

// 1. Init debugger for this file
const debug = getDebug('config-index');

// 2. Init the express application
const app = express();

// 3. Connect to database (MongoDB)
mongoConnect().catch((err) => debug(err));

// 4. Initialize template engine (Express-Handlebars)
initHbs(app);

// 5. Initialize application middleware
app.use(baseMiddleware);

// 6. Set Base Routes
app.get('/', indexRouter);

// -1. Set ErrorHandler Middleware Last
app.use(errorHandler);

export default app;
