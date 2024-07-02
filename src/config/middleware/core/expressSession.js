import expressSession from 'express-session';
import MongoStore from 'connect-mongo';

const session = expressSession({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});

export default session;
