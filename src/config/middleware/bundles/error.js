import createHttpError from 'http-errors';

const catch404 = (req, res, next) => next(createHttpError(404));

const errorHandler = (renderViewPath) => (err, req, res, next) => {
  const errorDetail = {
    stack: req.app.get('env') === 'development' ? err.stack : {},
    msg: err.message,
    status: err.status || 500,
  };
  if (req.xhr)
    return res.json({
      redirect: `/error?msg=${encodeURIComponent(errorDetail.msg)}&status=${errorDetail.status}&stack=${encodeURIComponent(errorDetail.stack || '')}`,
    });
  res.status(err.status || 500);
  res.locals.error = errorDetail;
  return res.render(renderViewPath);
};

export default (renderViewPath) => [catch404, errorHandler(renderViewPath)];
