import { FORM_SUBMITTER_CLIENT_SCRIPT } from '../utils/constants.js';
import { registerUser, userBasicToMemberUpgrade, updateAvatar } from '../config/middleware/index.js';
import isLoggedIn from '../config/middleware/authentication/isLoggedIn.js';
import userLogin from '../config/middleware/authentication/userLogin.js';

const userController = {
  getLogin: (req, res, next) => res.render('login', {}),
  postLogin: userLogin,
  getRegister: [
    (req, res, next) => {
      if (req.isAuthenticated()) return res.redirect(req.user.url);
      else return next();
    },
    (req, res, next) => res.render('register', { scripts: FORM_SUBMITTER_CLIENT_SCRIPT }),
  ],
  postRegister: registerUser,
  getUser: [isLoggedIn, (req, res, next) => res.render('userProfile')],
  postLogout: (req, res, next) => req.logout((err) => (err ? next(err) : res.redirect('/'))),
  postUpgradeToMember: userBasicToMemberUpgrade,
  postAvatarUpdate: updateAvatar,
};

export default userController;
