import asyncHandler from 'express-async-handler';

const dir = import.meta.dirname;

const indexController = {
  getIndex: asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'Hello World' });
  }),
};

export default indexController;
