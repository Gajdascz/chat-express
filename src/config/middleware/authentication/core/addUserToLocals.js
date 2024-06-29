export default (req, res, next) => {
  if (req.user) {
    const { username, fullName, url, status, avatar } = req.user;
    res.locals.currentUser = { username, fullName, url, status, avatar };
  }
  next();
};
