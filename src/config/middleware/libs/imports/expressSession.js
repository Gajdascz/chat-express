import expressSession from 'express-session';

const session = expressSession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false });

export default session;
