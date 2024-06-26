import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

const SALT = 10;

const hash = asyncHandler(async (req, res, next) => {
  const { hashKeys } = req;
  if (!hashKeys)
    return next(
      new Error(
        `hashKey(s) required to hash body string.Example: req.hashKeys = ['password'] would hash req.body.password`
      )
    );
  for (const key of hashKeys) {
    const value = req.body[key];
    if (!value) return console.warn(`No ${key} found in request body to hash`);
    const hashed = await bcrypt.hash(value, SALT);
    req.body[key] = hashed;
  }
  req.hashKeys = [];
  next();
});

const setHashKeys =
  (keys = null) =>
  (req, res, next) => {
    req.hashKeys = keys ?? [];
    next();
  };

export { hash, setHashKeys };
