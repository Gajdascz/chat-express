// Base
import { create as createHbs } from 'express-handlebars';

// Utils
import { getSubDirectories, handlebarsHelpers } from '../../utils/helpers.js';
import { P_VIEWS } from '../../utils/constants.js';
const { LAYOUTS, PARTIALS, MAIN } = P_VIEWS;

const hbs = createHbs({
  defaultLayout: 'main',
  layoutsDir: LAYOUTS,
  partialsDir: await getSubDirectories(PARTIALS, true),
  extname: 'hbs',
  helpers: handlebarsHelpers,
});

export default (app) => {
  app.set('view engine', 'hbs');
  app.set('views', MAIN);
  app.engine('hbs', hbs.engine);
};
