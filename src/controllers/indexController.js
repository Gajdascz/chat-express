import asyncHandler from 'express-async-handler';
import { getHbsChatboxContext } from '../utils/helpers.js';

const indexController = {
  getIndex: asyncHandler(async (req, res, next) => {
    res.render('index', {
      title: 'ChatExpress',
      chatbox: getHbsChatboxContext(),
    });
  }),
};

export default indexController;
