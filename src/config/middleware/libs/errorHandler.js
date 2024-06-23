import createHttpError from 'http-errors';

const catch404 = (req, res, next) => next(createHttpError(404));

const errorHandler = (renderViewPath) => (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  return res.render(renderViewPath);
};

export default (renderViewPath) => [catch404, errorHandler(renderViewPath)];
