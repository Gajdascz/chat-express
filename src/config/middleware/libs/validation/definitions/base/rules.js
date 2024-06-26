const isLength = (chain, min, max, type = 'characters') =>
  chain.isLength({ min, max }).withMessage(`Must be between ${min} and ${max} ${type}`);

const isEmail = (chain) => chain.isEmail().withMessage('Must be a correctly formatted email address');

const isUrl = (chain) => chain.isURL().withMessage('Must be a correctly formatted url address');

const isIn = (chain, values) => chain.isIn(values).withMessage(`Must be one of: ${values.join(', ')}`);

const isEqual = (chain, bodyProperty) =>
  chain
    .custom((value, { req }) => value === req.body[bodyProperty])
    .withMessage(`Must be equal to the provided ${bodyProperty}`);

const onlyLetters = (chain) => chain.matches(/^[a-zA-Z]+$/).withMessage('Must only contain letters');

const noSpecialChars = (chain) =>
  chain.matches(/^[a-zA-Z0-9_]+$/).withMessage(`Must only contain letters, numbers, and underscores (_)`);

const containsSpecialChar = (chain) =>
  chain.matches(/[!@#$%^&*()-_=+[\]{}|\\;:'",<.>/?]/).withMessage(`Must contain at least one special character`);

const containsLowercase = (chain) => chain.matches(/[a-z]/).withMessage(`Must contain at least one lower case letter`);

const containsUppercase = (chain) => chain.matches(/[A-Z]/).withMessage(`Must contain at least one capital letter`);

const containsDigit = (chain) => chain.matches(/\d/).withMessage(`Must contain at least one number`);

export {
  isLength,
  isEmail,
  isUrl,
  isIn,
  isEqual,
  onlyLetters,
  noSpecialChars,
  containsSpecialChar,
  containsLowercase,
  containsUppercase,
  containsDigit,
};
