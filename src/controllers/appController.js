import asyncHandler from 'express-async-handler';

const appController = {
  getIndex: asyncHandler(async (req, res, next) => {
    res.render('index', {
      title: 'ChatExpress',
      chatContext: 'global',
    });
  }),
};

export default appController;
