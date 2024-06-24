import asyncHandler from 'express-async-handler';
import { getHbsChatboxContext } from '../utils/helpers.js';
import { bcryptHash } from '../config/middleware/index.js';

const appController = {
  getIndex: asyncHandler(async (req, res, next) => {
    res.render('index', {
      title: 'ChatExpress',
      chatbox: getHbsChatboxContext(),
    });
  }),
};

export default appController;
