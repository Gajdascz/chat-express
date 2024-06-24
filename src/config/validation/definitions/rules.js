const escapeTrim = () => ({ trim: true, escape: true });
const optional = () => ({ optional: { nullable: true, checkFalsy: true } });

const isLength = (min, max) => ({
  isLength: { options: { min, max }, errorMessage: `Must be between ${min} and ${max} characters` },
});
const isEmail = () => ({ isEmail: true, errorMessage: `Invalid email. Must be in format name@domain.ext` });
const isUrl = () => ({ isURL: true, errorMessage: `Must be a valid URL` });
const isEnum = (values) => ({ isUrl: true, errorMessage: `Must be one of: ${values.join(', ')}` });

const onlyLetters = () => ({ matches: { options: /^[a-zA-Z]$/, errorMessage: `Must only contain letters` } });

const noSpecialChars = () => ({
  custom: {
    options: (str) => /^[a-zA-Z0-9_]+$/.test(str),
    errorMessage: `Must only contain letters, numbers, and/or underscores (_)`,
  },
});
const containsSpecialChar = () => ({
  matches: {
    options: /[!@#$%^&*()-_=+[\]{}|\\;:'",<.>/?]/,
    errorMessage: `Must contain at least one special character`,
  },
});
const containsLowercase = () => ({
  matches: { options: /[a-z]/, errorMessage: `Must contain at least one uppercase character` },
});
const containsUppercase = () => ({
  matches: { options: /[A-Z]/, errorMessage: `Must contain at least one lowercase character` },
});
const containsDigit = () => ({
  matches: { options: /[0-9]/, errorMessage: `Must contain at least one digit` },
});
export {
  escapeTrim,
  optional,
  isLength,
  isEmail,
  isUrl,
  isEnum,
  onlyLetters,
  noSpecialChars,
  containsSpecialChar,
  containsLowercase,
  containsUppercase,
  containsDigit,
};
