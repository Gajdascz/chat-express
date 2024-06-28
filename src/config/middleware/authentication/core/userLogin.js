import passport from './passport.js';

export default (req, res, next) =>
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      const errors = info.message.includes('password')
        ? [{ path: 'password', msg: info.message }]
        : [
            { path: 'username', msg: info.message },
            { path: `password`, msg: `` },
          ];
      return res.status(401).json({ errors });
    }
    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.status(200).json({ redirect: '/' });
    });
  })(req, res, next);
