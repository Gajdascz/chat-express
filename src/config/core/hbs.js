// Base
import { create as createHbs } from 'express-handlebars';

// Utils
import { getSubDirectories, capitalize, formatTimestamp, camelCase } from '../../utils/helpers.js';
import { P_VIEWS, USER_STATUSES, USER_STATUS_MAP } from '../../utils/constants.js';
const { LAYOUTS, PARTIALS, MAIN } = P_VIEWS;

const hbs = createHbs({
  defaultLayout: 'main',
  layoutsDir: LAYOUTS,
  partialsDir: await getSubDirectories(PARTIALS, true),
  extname: 'hbs',
  helpers: {
    capitalize,
    formatTimestamp,
    default: (provided, fallback) => provided ?? fallback,
    camelCase,
    getAvatarThumb: (imgSrc) => `<img src="${imgSrc}" class="avatar-thumb">`,
    getLogout: () =>
      `<form method='POST' action='/user/logout' class='post-button-form'><button class='logout-button'>Logout</button></form>`,
    getDropdownAnchor: (link) => `<a href="${link.href}">${link.text}</a>`,
    getLoggedInNavOptions: (url) => [
      hbs.helpers.getDropdownAnchor({ href: `${url}`, text: 'Profile' }),
      hbs.helpers.getLogout(),
    ],
    getLoggedInMobileNavOptions: (url) => [
      hbs.helpers.getDropdownAnchor({ href: '/', text: 'Home' }),
      hbs.helpers.getDropdownAnchor({ href: `${url}`, text: 'Profile' }),
      hbs.helpers.getLogout(),
    ],
    getDefaultMobileNavOptions: () => [
      hbs.helpers.getDropdownAnchor({ href: '/', text: 'Home' }),
      hbs.helpers.getDropdownAnchor({ href: '/user/register', text: 'Register' }),
      hbs.helpers.getDropdownAnchor({ href: '/user/login', text: 'Login' }),
    ],
    isBasicUser: function (userStatus, options) {
      return userStatus === USER_STATUSES.BASIC ? options.fn(this) : options.inverse(this);
    },
    canView: (currentStatus, requiredStatus) => USER_STATUS_MAP[currentStatus] >= USER_STATUS_MAP[requiredStatus],
  },
});

export default (app) => {
  app.set('view engine', 'hbs');
  app.set('views', MAIN);
  app.engine('hbs', hbs.engine);
};
