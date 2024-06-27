import passport from '../../../core/passport.js';

const userLogin = (req, res, next) =>
  passport.authenticate('local', (_err, user, info) => {
    if (user) {
      req.login(user, (err) => console.error(err));
      return res.status(200).json({ redirect: '/' });
    }
    const errors = info.message.includes('password')
      ? [{ path: 'password', msg: info.message }]
      : [
          { path: 'username', msg: info.message },
          { path: `password`, msg: `` },
        ];
    return res.status(401).json({ errors });
  })(req, res, next);

export { userLogin };
