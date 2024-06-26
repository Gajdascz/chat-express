export default (req, res, next) => {
  res.locals.cUser = req.user;
  next();
};
