import asyncHandler from 'express-async-handler';

const appController = {
  getIndex: asyncHandler(async (req, res, next) => {
    // console.log(req.user.avatar);
    res.render('index', {
      title: 'ChatExpress',
      chatContext: 'global',
    });
  }),
};

export default appController;
