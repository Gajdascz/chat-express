// Base
import { create as createHbs } from 'express-handlebars';

// Utils
import { getSubDirectories, capitalize, formatTimestamp, camelCase } from '../../utils/helpers.js';
import { P_VIEWS } from '../../utils/constants.js';
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
    getNavOptions: (url) => [
      hbs.helpers.getDropdownAnchor({ href: `${url}`, text: 'Profile' }),
      hbs.helpers.getLogout(),
    ],
    isNotEmptyStr: (str) => !(str.trim().length === 0),
  },
});

export default (app) => {
  app.set('view engine', 'hbs');
  app.set('views', MAIN);
  app.engine('hbs', hbs.engine);
};
