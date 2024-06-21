import createHttpError from 'http-errors';

const errorHandler = (req, res, next) => next(createHttpError(res.status || 500));

export default errorHandler;
