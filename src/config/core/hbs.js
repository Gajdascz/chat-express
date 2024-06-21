// Base
import { create as createHbs } from 'express-handlebars';

// Utils
import { P_VIEWS } from '../../utils/constants.js';
const { LAYOUTS, PARTIALS, MAIN } = P_VIEWS;

const hbs = createHbs({
  defaultLayout: 'main',
  layoutsDir: LAYOUTS,
  partialsDir: PARTIALS,
  extname: 'hbs',
});

export default (app) => {
  app.set('view engine', 'hbs');
  app.set('views', MAIN);
  app.engine('hbs', hbs.engine);
};
