const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  if (req.xhr) return res.status(401).json({ msg: `Unauthorized request`, redirect: '/' });
  return res.redirect('/');
};

export { isLoggedIn };
