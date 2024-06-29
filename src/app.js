// 0. Load environment variables into process.env
import './config/core/dotenv.js';

// Core
import express from 'express';
import { mongoConnect } from './config/core/db.js';
import initHbs from './config/core/hbs.js';

// Middleware
import { baseMiddleware, errorHandler } from './config/middleware/index.js';

// Utils
import { getDebug } from './utils/helpers.js';

import appController from './controllers/appController.js';
import userRouter from './routers/userRouter.js';
import messageRouter from './routers/messageRouter.js';

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
app.get('/', appController.getIndex);
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.get('/error', (req, res) =>
  res.render('error', { error: { msg: req.query.msg, status: req.query.status, stack: req.query.stack } })
);

// -1. Set ErrorHandler Middleware Last
app.use(errorHandler('error'));

export default app;
